using System;
using API.DTOs;
using API.Entities;
using API.Extensions;
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

        PostExtensions.SetConditionalFieldsForAddPost(postDto);

        var uploadResult = await photoService.AddPhotoAsync(file);
        
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

    [HttpPut("edit-post/{id:int}")]
    public async Task<ActionResult> UpdatePost(int id, [FromForm] PostDto postDto, [FromForm] IFormFile? file = null)
    {
        var post = await postRepo.GetPostByIdAsync(id);
        if (post == null) return BadRequest("Post not found.");

        post.Title = postDto.Title;
        post.LocationCountry = postDto.LocationCountry;
        post.LocationCity = postDto.LocationCity;
        post.LastCountry = postDto.LastCountry;
        post.LastCity = postDto.LastCity;
        post.LocalTransport = postDto.LocalTransport;
        post.EntranceFee = postDto.EntranceFee;
        post.PlaceStay = postDto.PlaceStay;
        post.GroceryStore = postDto.GroceryStore;
        post.Guide = postDto.Guide;
        post.Currency = postDto.Currency;
        post.Description = postDto.Description;

        post.SetConditionalFieldsForEditPost(postDto);

        if (file != null)
        {
            var uploadResult = await photoService.AddPostPhotoAsync(file);
            if (uploadResult.Error != null) return BadRequest(uploadResult.Error.Message);

            post.Url = uploadResult.SecureUrl.AbsoluteUri;
        }

        postRepo.Update(post);

        if (await postRepo.SaveAllAsync())
        {
            return NoContent();
        }

        return BadRequest("Failed to update post");
    }

    [HttpDelete("delete-post/{id:int}")]
    public async Task<ActionResult> DeletePost(int id)
    {
        var post = await postRepo.GetPostByIdAsync(id);
        if (post == null) return NotFound("Post not found.");

        if (!string.IsNullOrEmpty(post.Url))
        {
            var publicId = PostExtensions.ExtractPublicIdFromUrl(post.Url);
            if (!string.IsNullOrEmpty(publicId))
            {
                var result = await photoService.DeletePhotoAsync(publicId);
                if (result.Error != null) return BadRequest("Failed to delete photo from Cloudinary.");
            }
        }

        postRepo.Delete(post);

        if (await postRepo.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to delete post");
    }


    // [HttpDelete("delete-photo/{photoId:int}")]
    // public async Task<ActionResult> DeletePhoto(int photoId)
    // {
    //     var user = await userRepo.GetUserByUsernameAsync(User.GetUsername());

    //     if (user == null) return BadRequest("User not found");

    //     var photo = user.Posts.FirstOrDefault(x => x.Id == photoId);

    //     if (photo == null ) return BadRequest("This photo cannot be deleted");

    //     if (photo.PublicId != null)
    //     {
    //         var result = await photoService.DeletePhotoAsync(photo.PublicId);
    //         if (result.Error != null) return BadRequest(result.Error.Message);
    //     }

    //     user.GeneralPhotos.Remove(photo);

    //     if (await userRepo.SaveAllAsync()) return Ok();

    //     return BadRequest("Problem deleting photo");
    // }
}