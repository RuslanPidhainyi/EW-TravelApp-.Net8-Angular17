using System;
using API.Extensions;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public byte[] PasswordHash { get; set; } = [];
    public byte[] PasswordSalt { get; set; } = [];
    public DateOnly DateOfBirth { get; set; }
    public required string KnownAs { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public required string Gender { get; set; }
    public string? Description { get; set; }
    public string? Interests { get; set; }
    public required string Country { get; set; }
    public required string City { get; set; }

    //Navigation properties
    public List<Photo> GeneralPhotos { get; set; } = [];
    public List<Post> Posts {get; set;} = [];

    public List<Like> Likes { get; set; } = [];
}