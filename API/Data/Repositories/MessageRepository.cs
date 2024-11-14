using System;
using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class MessageRepository(AppDbContext context, IMapper mapper) : IMessageRepository
{
    public void AddMessage(Message message)
    {
        context.Messages.Add(message);
    }

    public void DeleteMessage(Message message)
    {
        context.Messages.Remove(message);
    }

    public async Task<Message?> GetMessage(int Id)
    {
        return await context.Messages.FindAsync(Id);
    }

    public Task<MessageDto> GetMessagesForUser()
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipientUsername)
    {   
        //note: liste jednostek messages z bd
        var messages = await context.Messages
            .Include(x => x.Sender).ThenInclude(x => x.GeneralPhotos)
            .Include(x => x.Recipient).ThenInclude(x => x.GeneralPhotos)
            .Where(x =>
                x.RecipientUsername == currentUsername && x.SenderUsername == recipientUsername
                || x.SenderUsername == currentUsername && x.RecipientUsername == recipientUsername)
            .OrderBy(x => x.MessageSent)
            .ToListAsync();
        
        //note: Sprawdzania czy są jakies nie przyczytane messages
        var unreadMessages = messages
            .Where(x => x.DateRead == null && x.RecipientUsername == currentUsername)
            .ToList();

        //note: Jesli są nie przyczytane messages - to ustawia daty na aktualną datę co skuteczne oznacza messages jako przeczytaną
        if(unreadMessages.Count != 0)
        {
            unreadMessages.ForEach(x => x.DateRead = DateTime.UtcNow);
            await context.SaveChangesAsync();
        }

        //note: odsyła nasz messages
        return mapper.Map<IEnumerable<MessageDto>>(messages);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
