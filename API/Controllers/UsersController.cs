using System;
using API.Controllers;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepo, IMapper mapper) : BaseApiController
{
    [HttpGet] // /api/users
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await userRepo.GetUsersAsync();

        var usersToReturn = mapper.Map<IEnumerable<MemberDto>>(users);

        return Ok(usersToReturn);
    }

    [HttpGet("{username}")] // /api/users/2
    public async Task<ActionResult<MemberDto>> GetUsers(string username)
    {
        var user = await userRepo.GetUserByUsernameAsync(username);

        if (user == null) return NotFound();

        return mapper.Map<MemberDto>(user);
    }
}