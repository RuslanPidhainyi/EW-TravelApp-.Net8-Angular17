using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
    public DbSet<Photo> GeneralPhotos { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<User_Post> Users_Posts {get; set;}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<AppUser>()
            .HasMany(u => u.Posts)
            .WithOne(p => p.AppUser)
            .HasForeignKey(p => p.AppUserId);

        base.OnModelCreating(builder);

        builder.Entity<User_Post>()
            .HasKey(up => new {
                up.AppUserId,
                up.PostId
            });
        
        builder.Entity<User_Post>()
            .HasOne(up => up.AppUser)
            .WithMany(up => up.Users_Posts)
            .HasForeignKey(up => up.AppUserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<User_Post>()
            .HasOne(up => up.Post)
            .WithMany(up => up.Users_Posts)
            .HasForeignKey(up => up.PostId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}