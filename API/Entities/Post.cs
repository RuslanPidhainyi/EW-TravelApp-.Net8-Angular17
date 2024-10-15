namespace API.Entities;

public class Post
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }

    //Navigation properties
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
}