namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    //Navigation properties
    public int ApppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
}