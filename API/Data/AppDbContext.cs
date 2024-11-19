using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
    public DbSet<Photo> GeneralPhotos { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Like> Likes {get; set;}
    public DbSet<Message> Messages {get; set;}

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<AppUser>()
            .HasMany(u => u.Posts)
            .WithOne(p => p.AppUser)
            .HasForeignKey(p => p.AppUserId);

        base.OnModelCreating(builder);

        builder.Entity<Like>()
            .HasKey(up => new {
                up.AppUserId,
                up.PostId
            });
        
        builder.Entity<Like>()
            .HasOne(up => up.AppUser)
            .WithMany(up => up.Likes)
            .HasForeignKey(up => up.AppUserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Like>()
            .HasOne(up => up.Post)
            .WithMany(up => up.Likes)
            .HasForeignKey(up => up.PostId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Message>()
            .HasOne(x => x.Recipient)
            .WithMany(x => x.MessagesReceived)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Message>()
            .HasOne(x => x.Sender)
            .WithMany(x => x.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);
    }
}