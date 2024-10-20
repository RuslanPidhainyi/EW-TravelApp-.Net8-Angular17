namespace API.DTOs;

public class PostDto
{
    public int Id { get; set; }
    public string? PhotoUrl { get; set; }
    public required string Country { get; set; }
    public required string City { get; set; }
    public string? Title { get; set; }
    public int PriceForRoad { get; set; } //CustomDesc
    public bool TouristPlaces { get; set; } //CustomDesc
    public int PriceForEnter { get; set; } //CustomDesc
    public bool ShopsNearby { get; set; } //CustomDesc
    public string? Shops { get; set; } //CustomDesc
    public string? Description { get; set; }
    public int AppUserId { get; set; }
    public string? UserName { get; set; } //KnowAs
}