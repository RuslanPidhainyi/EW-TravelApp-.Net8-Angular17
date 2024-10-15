using System;
using API.DTOs;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class PostsController(IPostRepository postRepo, IMapper mapper) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostDto>>> GetAllPosts()
    {
        var posts = await postRepo.GetPostsAsync();
        var postsToReturn = mapper.Map<IEnumerable<PostDto>>(posts);
        return Ok(postsToReturn);
    }
}
