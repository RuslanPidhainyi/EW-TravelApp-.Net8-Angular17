using System;
using API.Controllers;
using API.Data;
using API.Entities;
using API.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepo) : BaseApiController
{
    [HttpGet] // /api/users
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users = await userRepo.GetUsersAsync();

        return Ok(users);
    }

    [HttpGet("{username}")] // /api/users/2
    public async Task<ActionResult<AppUser>> GetUsers(string username)
    {
        var user = await userRepo.GetUserByUsernameAsync(username);

        if (user == null) return NotFound();

        return user;
    }
}