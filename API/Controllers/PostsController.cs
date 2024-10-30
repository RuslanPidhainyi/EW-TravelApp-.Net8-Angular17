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
public class PostsController(IPostRepository postRepo, IUserRepository userRepo, IPhotoService photoService, IMapper mapper) : BaseApiController
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
    public async Task<ActionResult<PostDto>> CreatePost([FromForm] PostDto postDto, [FromForm] IFormFile file)
    {
        var username = User.GetUsername();
        var user = await userRepo.GetUserByUsernameAsync(username);

        if (user == null) return BadRequest("Could not find user");

        if (!postDto.LocalTransport)
        {
            postDto.MinPriceLocalTrans = 0;
            postDto.MaxPriceLocalTrans = 0;
            postDto.TravelTime = 0;
        }

        if (!postDto.EntranceFee)
        {
            postDto.MinPriceEntrFee = 0;
            postDto.MaxPriceEntrFee = 0;
        }

        if (!postDto.PlaceStay)
        {
            postDto.TypePlaceStay = "None";
            postDto.MinPricePlaceStay = 0;
            postDto.MaxPricePlaceStay = 0;
        }

        if (!postDto.GroceryStore)
        {
            postDto.MinPriceGroceryStore = 0;
            postDto.MaxPriceGroceryStore = 0;
        }

        if (!postDto.Guide)
        {
            postDto.MinPriceGuide = 0;
            postDto.MaxPriceGuide = 0;
        }

        var uploadResult = await photoService.AddPostPhotoAsync(file);
        if (uploadResult.Error != null) return BadRequest(uploadResult.Error.Message);

        var post = mapper.Map<Post>(postDto);
        post.AppUserId = user.Id;
        post.Url = uploadResult.SecureUrl.AbsoluteUri;

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