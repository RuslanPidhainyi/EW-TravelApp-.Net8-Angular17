using System;
using API.DTOs;
using API.Entities;

namespace API.Interface;

public interface IPostRepository
{
    void Update(Post post);
    Task<bool> SaveAllAsync();
    Task<IEnumerable<Post>> GetPostsAsync();
    Task<Post?> GetPostByIdAsync(int id);

    // Task<Post?> GetPostByUsernameAsync(string username);
    Task<IEnumerable<PostDto>> GetOffersAsync();
    Task<PostDto?> GetOfferAsync(int id);
}
