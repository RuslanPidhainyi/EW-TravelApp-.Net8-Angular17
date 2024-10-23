using System.Security.Claims;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepo, IPhotoService photoService, IMapper mapper) : BaseApiController
{
    [HttpGet] // /api/users
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await userRepo.GetMembersAsync();

        return Ok(users);
    }

    [HttpGet("{username}")] // /api/users/2
    public async Task<ActionResult<MemberDto>> GetUser(string username)
    {
        var user = await userRepo.GetMemberAsync(username);

        if (user == null) return NotFound();

        return user;
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdatedDto memberUpdateDto)
    {
        var user = await userRepo.GetUserByUsernameAsync(User.GetUsername());

        if (user is null) return BadRequest("Could not found user");

        mapper.Map(memberUpdateDto, user);

        if (await userRepo.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update the user");
    }

    [HttpPost("add-photo")]
    public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
    {
        var user = await userRepo.GetUserByUsernameAsync(User.GetUsername());

        if (user == null) return BadRequest("Cannot update user");

        var result = await photoService.AddPhotoAsync(file);

        if (result.Error != null) return BadRequest(result.Error.Message);

        var photo = new Photo
        {
            Url = result.SecureUrl.AbsoluteUri,
            PublicId = result.PublicId
        };

        if (user.GeneralPhotos.Count == 0) photo.IsMain = true;

        user.GeneralPhotos.Add(photo);

        if (await userRepo.SaveAllAsync())
            return mapper.Map<PhotoDto>(photo);

        return BadRequest("Problem adding photo");
    }
}