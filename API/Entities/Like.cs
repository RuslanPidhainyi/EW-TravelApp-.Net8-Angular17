namespace API.Entities;

public class Like
{
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
    
    public int PostId { get; set; }
    public Post Post { get; set; } = null!;
}