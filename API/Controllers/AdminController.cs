using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AdminController : BaseApiController
{
    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet("users-with-roles")]
    public ActionResult GetUsersWithRoles()
    {
        return Ok("Only admins can see this");
    }

    [Authorize(Policy = "ModerateContentRole")]
    [HttpGet("contents-to-moderate")]
    public ActionResult GetContentForModeration()
    {
        return Ok("Admins or moderators can see this");
    }
}