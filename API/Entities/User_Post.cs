namespace API.Entities;

public class User_Post
{
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
    
    public int PostId { get; set; }
    public Post Post { get; set; } = null!;
}