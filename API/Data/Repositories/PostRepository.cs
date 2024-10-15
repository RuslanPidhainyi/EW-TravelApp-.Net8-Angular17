using System;
using API.Entities;
using API.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class PostRepository(AppDbContext context) : IPostRepository
{
    public async Task<IEnumerable<Post>> GetPostsAsync()
    {
        return await context.Posts
                .Include(p => p.AppUser)
                .ToListAsync();
    }
    
    public async Task<Post?> GetPostByIdAsync(int id)
    {
        return await context.Posts
                .Include(p => p.AppUser)
                .FirstOrDefaultAsync(p => p.Id == id);
    }

    public void Update(Post post)
    {
        context.Entry(post).State = EntityState.Modified;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}