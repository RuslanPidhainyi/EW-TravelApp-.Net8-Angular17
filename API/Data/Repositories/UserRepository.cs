using System;
using API.Entities;
using API.Interface;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class UserRepository(AppDbContext context) : IUserRepository
{
    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
        return await context.Users.FindAsync(id);   
    }
    public async Task<AppUser?> GetUserByUsernameAsync(string username)
    {
        return await context.Users
            .Include(x => x.GeneralPhotos)
            .SingleOrDefaultAsync(x => x.UserName == username);
    }
    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await context.Users
            .Include(x => x.GeneralPhotos)
            .ToListAsync();
    }
    public async Task<bool> SaveAllASync()
    {
        return await context.SaveChangesAsync() > 0;
    }
    public void Update(AppUser user)
    {
        context.Entry(user).State = EntityState.Modified;
    }
}
