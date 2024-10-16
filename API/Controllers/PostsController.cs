using System;
using API.DTOs;
using API.Entities;
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

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PostDto>> GetPost(int id)
    {
        var post = await postRepo.GetPostByIdAsync(id);

        if (post == null) return NotFound();

        var postToReturn = mapper.Map<PostDto>(post);

        return Ok(postToReturn);
    }
}