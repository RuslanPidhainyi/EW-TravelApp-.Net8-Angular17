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

    [HttpPut("{id:int}")]
    public async Task<ActionResult> UpdatePost(int id, [FromForm] PostDto postDto, [FromForm] IFormFile? file = null)
    {
        var post = await postRepo.GetPostByIdAsync(id);
        if (post == null) return NotFound("Post not found.");

        // Оновлення властивостей посту
        post.Title = postDto.Title;
        post.LocationCountry = postDto.LocationCountry;
        post.LocationCity = postDto.LocationCity;
        post.LastCountry = postDto.LastCountry;
        post.LastCity = postDto.LastCity;
        post.LocalTransport = postDto.LocalTransport;
        post.MinPriceLocalTrans = postDto.LocalTransport ? postDto.MinPriceLocalTrans : 0;
        post.MaxPriceLocalTrans = postDto.LocalTransport ? postDto.MaxPriceLocalTrans : 0;
        post.TravelTime = postDto.LocalTransport ? postDto.TravelTime : 0;
        post.EntranceFee = postDto.EntranceFee;
        post.MinPriceEntrFee = postDto.EntranceFee ? postDto.MinPriceEntrFee : 0;
        post.MaxPriceEntrFee = postDto.EntranceFee ? postDto.MaxPriceEntrFee : 0;
        post.PlaceStay = postDto.PlaceStay;
        post.TypePlaceStay = postDto.PlaceStay ? postDto.TypePlaceStay : "None";
        post.MinPricePlaceStay = postDto.PlaceStay ? postDto.MinPricePlaceStay : 0;
        post.MaxPricePlaceStay = postDto.PlaceStay ? postDto.MaxPricePlaceStay : 0;
        post.GroceryStore = postDto.GroceryStore;
        post.MinPriceGroceryStore = postDto.GroceryStore ? postDto.MinPriceGroceryStore : 0;
        post.MaxPriceGroceryStore = postDto.GroceryStore ? postDto.MaxPriceGroceryStore : 0;
        post.Guide = postDto.Guide;
        post.MinPriceGuide = postDto.Guide ? postDto.MinPriceGuide : 0;
        post.MaxPriceGuide = postDto.Guide ? postDto.MaxPriceGuide : 0;
        post.Currency = postDto.Currency;
        post.Description = postDto.Description;

        // Завантаження нового фото, якщо воно надано
        if (file != null)
        {
            var uploadResult = await photoService.AddPostPhotoAsync(file);
            if (uploadResult.Error != null) return BadRequest(uploadResult.Error.Message);

            post.Url = uploadResult.SecureUrl.AbsoluteUri; // Оновлюємо URL фото
        }

        postRepo.Update(post);

        if (await postRepo.SaveAllAsync())
        {
            return NoContent(); // Повертаємо 204 No Content у разі успішного оновлення
        }

        return BadRequest("Failed to update post");
    }


    // [HttpPut("{id:int}")]
    // public async Task<ActionResult> UpdatePost(int id, [FromForm] PostDto postDto, [FromForm] IFormFile? file = null)
    // {
    //     var post = await postRepo.GetPostByIdAsync(id);
    //     if (post == null) return NotFound("Post not found.");

    //     // Використовуємо AutoMapper для маппінгу з PostDto до Post
    //     mapper.Map(postDto, post);

    //     // Завантаження нового фото, якщо воно надано
    //     if (file != null)
    //     {
    //         var uploadResult = await photoService.AddPostPhotoAsync(file);
    //         if (uploadResult.Error != null) return BadRequest(uploadResult.Error.Message);

    //         post.Url = uploadResult.SecureUrl.AbsoluteUri; // Оновлюємо URL фото
    //     }

    //     postRepo.Update(post);

    //     if (await postRepo.SaveAllAsync())
    //     {
    //         return NoContent(); // Повертаємо 204 No Content у разі успішного оновлення
    //     }

    //     return BadRequest("Failed to update post");
    // }

    // [HttpPut("{id:int}")]
    // public async Task<ActionResult<PostDto>> UpdatePost(int id, [FromForm] PostDto postDto, [FromForm] IFormFile? file)
    // {
    //     var post = await postRepo.GetPostByIdAsync(id);
    //     if (post == null) return NotFound();

    //     mapper.Map(postDto, post); // Використання AutoMapper для оновлення властивостей

    //     if (file != null)
    //     {
    //         // Логіка для завантаження нового фото, якщо воно надане
    //         var result = await photoService.AddPostPhotoAsync(file);
    //         if (result.Error != null) return BadRequest(result.Error.Message);
    //         post.Url = result.SecureUrl.AbsoluteUri; // Оновлення URL фото
    //     }

    //     if (await postRepo.SaveAllAsync()) return NoContent(); // Повертаємо 204 No Content у разі успішного оновлення

    //     return BadRequest("Failed to update post");
    // }

}