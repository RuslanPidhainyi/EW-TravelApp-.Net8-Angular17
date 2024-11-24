using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext(DbContextOptions options)
: IdentityDbContext<AppUser, AppRole, int, IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, IdentityRoleClaim<int>, IdentityUserToken<int>>(options)
{
    //public DbSet<AppUser> Users { get; set; }
    public DbSet<Photo> GeneralPhotos { get; set; }
    public DbSet<Post> Posts { get; set; }
    public DbSet<Like> Likes { get; set; }
    public DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        //note: AppUser
        builder.Entity<AppUser>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.User)
            .HasForeignKey(ur => ur.UserId)
            .IsRequired();

        //note: AppRole
        builder.Entity<AppRole>()
            .HasMany(ur => ur.UserRoles)
            .WithOne(u => u.Role)
            .HasForeignKey(ur => ur.RoleId)
            .IsRequired();

        // builder.Entity<AppUser>()
        //     .HasMany(u => u.Posts)
        //     .WithOne(p => p.AppUser)
        //     .HasForeignKey(p => p.AppUserId);

        builder.Entity<AppUser>()
            .HasMany(u => u.Posts)
            .WithOne(p => p.AppUser)
            .HasForeignKey(p => p.AppUserId)
            .OnDelete(DeleteBehavior.Cascade);




        // builder.Entity<Like>()
        //     .HasKey(up => new {
        //         up.AppUserId,
        //         up.PostId
        //     });

        // builder.Entity<Like>()
        //     .HasOne(up => up.AppUser)
        //     .WithMany(up => up.Likes)
        //     .HasForeignKey(up => up.AppUserId)
        //     .OnDelete(DeleteBehavior.Cascade);

        // builder.Entity<Like>()
        //     .HasOne(up => up.Post)
        //     .WithMany(up => up.Likes)
        //     .HasForeignKey(up => up.PostId)
        //     .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Like>()
            .HasKey(l => new { l.AppUserId, l.PostId });

        builder.Entity<Like>()
            .HasOne(l => l.AppUser)
            .WithMany(u => u.Likes)
            .HasForeignKey(l => l.AppUserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Like>()
            .HasOne(l => l.Post)
            .WithMany(p => p.Likes)
            .HasForeignKey(l => l.PostId)
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