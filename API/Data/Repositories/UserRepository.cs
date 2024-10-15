using System;
using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public class UserRepository(AppDbContext context, IMapper mapper) : IUserRepository
{
    public async Task<MemberDto?> GetMemberAsync(string username)
    {
        return await context.Users
        .Where(x => x.UserName == username)
        .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
        .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<MemberDto>> GetMembersAsync()
    {
        return await context.Users
        .ProjectTo<MemberDto>(mapper.ConfigurationProvider)
        .ToListAsync();
    }

    public async Task<AppUser?> GetUserByIdAsync(int id)
    {
        return await context.Users.FindAsync(id);
    }

    public async Task<AppUser?> GetUserByUsernameAsync(string username)
    {
        return await context.Users
            .Include(x => x.GeneralPhotos)
            .Include(x => x.Posts)
            .SingleOrDefaultAsync(x => x.UserName == username);
    }

    public async Task<IEnumerable<AppUser>> GetUsersAsync()
    {
        return await context.Users
            .Include(x => x.GeneralPhotos)
            .Include(x => x.Posts)
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