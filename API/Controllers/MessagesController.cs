using System;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class MessagesController(IMessageRepository messageRepo, IUserRepository userRepo, IMapper mapper) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<MessageDto>> CreateMessage(CreateMessageDto createMessageDto)
    {
        var username = User.GetUsername();

        if (username == createMessageDto.RecipientUsername.ToLower()) return BadRequest("You cannot message yourself");

        var sender = await userRepo.GetUserByUsernameAsync(username);
        var recipient = await userRepo.GetUserByUsernameAsync(createMessageDto.RecipientUsername);

        if (recipient == null || sender == null || sender.UserName == null || recipient.UserName == null) 
            return BadRequest("Cannot send message at this time");

        var message = new Message
        {
            Sender = sender,
            Recipient = recipient,
            SenderUsername = sender.UserName,
            RecipientUsername = recipient.UserName,
            Content = createMessageDto.Content
        };

        messageRepo.AddMessage(message);

        if (await messageRepo.SaveAllAsync()) return Ok(mapper.Map<MessageDto>(message));

        return BadRequest("Failed to save message");
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
    {
        messageParams.Username = User.GetUsername();

        var messages = await messageRepo.GetMessagesForUser(messageParams);

        Response.AddPaginationHeader(messages);

        return messages;
    }

    [HttpGet("thread/{username}")]
    public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessageThread(string username)
    {
        var currentUsername = User.GetUsername();

        return Ok(await messageRepo.GetMessageThread(currentUsername, username));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteMessage(int id)
    {
        var username = User.GetUsername();

        var message = await messageRepo.GetMessage(id);

        if (message == null) return BadRequest("Cannot delete this message!");

        if (message.SenderUsername != username && message.RecipientUsername != username) return Forbid();//note: Forbid = zabronic - zwroci nam 204 - czyli zabroniac

        if(message.SenderUsername == username) message.SenderDeleted = true;
        if(message.RecipientUsername == username) message.RecipientDeleted = true;

        //note: this conditional  if(message.SenderDeleted == true && message.RecipientDeleted == true) equels this if(message is {SenderDeleted: true, RecipientDeleted: true})

        if(message is {SenderDeleted: true, RecipientDeleted: true}) messageRepo.DeleteMessage(message);

        if(await messageRepo.SaveAllAsync()) return Ok();

        return BadRequest("Problem deleting the message");
    }
}