using System;
using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class PostRepository(AppDbContext context, IMapper mapper) : IPostRepository
{
    public async Task<IEnumerable<PostDto>> GetPostsByUsernameAsync(string username)
    {
        return await context.Posts
            .Where(p => p.AppUser.UserName == username)
            .ProjectTo<PostDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<PostDto?> GetOfferAsync(int id)
    {
        return await context.Posts
            .Where(x => x.Id == id)
            .ProjectTo<PostDto>(mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<PostDto>> GetOffersAsync()
    {
        return await context.Posts
            .ProjectTo<PostDto>(mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<Post?> GetPostByIdAsync(int id)
    {
        return await context.Posts
                .Include(p => p.AppUser)
                .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<Post>> GetPostsAsync()
    {
        return await context.Posts
                .Include(p => p.AppUser)
                .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(Post post)
    {
        context.Entry(post).State = EntityState.Modified;
    }

    public async Task Add(Post post)
    {
        await context.Posts.AddAsync(post);
    }

    public void Delete(Post post)
    {
        context.Posts.Remove(post);
    }
}