using System;
using API.DTOs;
using API.Entities;
using API.Interface;

namespace API.Data.Repositories;

public class LikesRepository : ILikesRepository
{
    public void AddLike(Like like)
    {
        throw new NotImplementedException();
    }

    public void DeleteLike(Like like)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<int>> GetCurrentUserLikeIds(int currentuserId)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<PostDto>> GetLikedPosts(int userId, int postId)
    {
        throw new NotImplementedException();
    }

    public Task<Like?> GetPostLike(int appUserId, int postUserid)
    {
        throw new NotImplementedException();
    }

    public Task<bool> SaveChanges()
    {
        throw new NotImplementedException();
    }
}
