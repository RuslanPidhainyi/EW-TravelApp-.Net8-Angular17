using System;
using API.Entities;

namespace API.Interface;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> SaveAllASync();
    Task<IEnumerable<AppUser>> GetUsersAsync();
    Task<AppUser?> GetUserByIdAsync(int id);
    Task<AppUser?> GetUserByUsernameAsync(string username);
}