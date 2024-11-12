using System;
using API.DTOs;
using API.Entities;

namespace API.Interface;

public interface ILikesRepository
{
    Task<Like?> GetPostLike(int appUserId, int postUserid);
    Task<IEnumerable<PostDto>> GetLikedPosts(int userId, int postId);
    Task<IEnumerable<int>> GetCurrentUserLikeIds(int currentuserId);
    void DeleteLike(Like like);
    void AddLike(Like like);
    Task<bool> SaveChanges();
}
