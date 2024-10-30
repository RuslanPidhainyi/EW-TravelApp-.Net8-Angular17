using System;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class PostsController(IPostRepository postRepo, IUserRepository userRepo, IMapper mapper) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PostDto>>> GetPosts()
    {
        var posts = await postRepo.GetOffersAsync();

        return Ok(posts);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<PostDto>> GetPost(int id)
    {
        var post = await postRepo.GetOfferAsync(id);

        if (post == null) return NotFound();

        return post;
    }

    [HttpGet("user/{username}")]
    public async Task<ActionResult<IEnumerable<PostDto>>> GetPostsByUsername(string username)
    {
        var posts = await postRepo.GetPostsByUsernameAsync(username);
        return Ok(posts);
    }

    [HttpPost("add-post")]
    public async Task<ActionResult<PostDto>> CreatePost(PostDto postDto)
    {
        var username = User.GetUsername();
        var user = await userRepo.GetUserByUsernameAsync(username);

        if (user == null) return BadRequest("Could not find user");

        var post = mapper.Map<Post>(postDto);
        post.AppUserId = user.Id;

        await postRepo.Add(post);

        if (await postRepo.SaveAllAsync())
        {
            var createdPostDto = mapper.Map<PostDto>(post);
            createdPostDto.AppUserId = user.Id;
            createdPostDto.UserName = user.UserName;

            return CreatedAtAction(nameof(GetPost), new { id = post.Id }, createdPostDto);
        }

        return BadRequest("Failed to create post");
    }

}