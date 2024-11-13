using System;
using API.DTOs;
using API.Entities;

namespace API.Interface;

public interface ILikesRepository
{
    Task<Like?> GetPostLike(int appUserId, int postUserid);
    Task<IEnumerable<PostDto>> GetLikedPosts(string predicate, int userId);
    Task<IEnumerable<int>> GetCurrentUserLikeIds(int currentUserId);
    void DeleteLike(Like like);
    void AddLike(Like like);
    Task<bool> SaveChanges();
}