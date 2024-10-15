namespace API.DTOs;

public class PostDto
{
    public int Id { get; set; }
    public string? Url { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public int AppUserId { get; set; }
    public string? UserName { get; set; } //KnowAs
}