using System;
using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class LikesRepository(AppDbContext context, IMapper mapper) : ILikesRepository
{
    public void AddLike(Like like)
    {
        context.Likes.Add(like);
    }

    public void DeleteLike(Like like)
    {
        context.Likes.Remove(like);
    }

    public async Task<IEnumerable<int>> GetCurrentUserLikeIds(int currentUserId)
    {
        return await context.Likes
            .Where(x => x.AppUserId == currentUserId)
            .Select(x => x.PostId)
            .ToListAsync();
    }

    public async Task<IEnumerable<PostDto>> GetLikedPosts(string predicate, int userId)
    {
        var likes = context.Likes.AsQueryable();

        switch (predicate)
        {
            case "liked":
                return await likes
                    .Where(x => x.AppUserId == userId)
                    .Select(x => x.Post)
                    .ProjectTo<PostDto>(mapper.ConfigurationProvider)
                    .ToListAsync();

            case "likedBy":
                return await likes
                    .Where(x => x.PostId == userId)
                    .Select(x => x.AppUser)
                    .ProjectTo<PostDto>(mapper.ConfigurationProvider)
                    .ToListAsync();

            default:
                var likeIds = await GetCurrentUserLikeIds(userId);

                return await likes
                    .Where(x => x.PostId == userId && likeIds.Contains(x.AppUserId))
                    .Select(x => x.Post)
                    .ProjectTo<PostDto>(mapper.ConfigurationProvider)
                    .ToListAsync();
        }
    }

    public async Task<Like?> GetPostLike(int appUserId, int postUserid)
    {
        return await context.Likes.FindAsync(appUserId, postUserid);
    }

    public async Task<bool> SaveChanges()
    {
        return await context.SaveChangesAsync() > 0;
    }
}