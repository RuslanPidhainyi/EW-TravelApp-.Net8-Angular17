namespace API.DTOs;

public class MemberDto
{
    public int Id { get; set; }
    public string? Username { get; set; }
    public int Age { get; set; }
    public string? GeneralPhotoUrl { get; set; }
    public string? KnownAs { get; set; }
    public DateTime Created { get; set; }
    public DateTime LastActive { get; set; }
    public string? Gender { get; set; }
    public string? Description { get; set; }
    public string? Interests { get; set; }
    public string? Country { get; set; }
    public string? City { get; set; }
    public List<PhotoDto>? GeneralPhotos { get; set; }
    public List<PostDto>? Posts {get; set;}
}
