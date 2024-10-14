using System;

namespace API.Entities;

public class AppUser
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public required byte[] PasswordHash { get; set; } = [];
    public required byte[] PasswordSalt { get; set; } = [];
    public required string KnownAs { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public required string Gender { get; set; }
    // public string? Introduction { get; set; }
    // public string? Interests { get; set; }
    // public string? LookingFor { get; set; }
    public required string Country { get; set; }
    public required string City { get; set; }
    public List<Photo> GeneralPhotos {get; set;} = [];
    //public List<PhotoPosts> PhotosOfPosts {get; set;} = [];
}
