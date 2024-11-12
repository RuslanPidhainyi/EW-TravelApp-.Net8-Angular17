using System;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interface;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class LikesController(ILikesRepository likesRepo) : BaseApiController
{
    [HttpPost("{postUserId:int}")]
    public async Task<ActionResult> ToggleLike(int postUserId)
    {
        var appUserId = User.GetUserId();

        if(appUserId == postUserId) return BadRequest("You cannot like your own post");

        var existingLike = await likesRepo.GetPostLike(appUserId, postUserId);

        if(existingLike == null)
        {
            var like = new Like
            {
                AppUserId = appUserId,
                PostId = postUserId,
            };

            likesRepo.AddLike(like);
        }
        else
        {
            likesRepo.DeleteLike(existingLike);
        }

        if(await likesRepo.SaveChanges()) return Ok();

        return BadRequest("Failed to update like");
    }

    [HttpGet("list")]
    public async Task<ActionResult<IEnumerable<int>>> GetCurrentUserLikeds()
    {
        return Ok(await likesRepo.GetCurrentUserLikeIds(User.GetUserId()));
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostDto>>> GetLikedPosts(string predicate)
    {
        var posts = await likesRepo.GetLikedPosts(predicate, User.GetUserId());

        return Ok(posts);
    }
}