namespace API.Entities;

public class Post
{
    public int Id { get; set; }
    public required string PhotoUrl { get; set; }
    //public required string Location { get; set; }
    public required string Country { get; set; }
    public required string City { get; set; }
    public string? Title { get; set; }
    public int PriceForRoad { get; set; } //CustomDesc
    public bool TouristPlaces { get; set; } //CustomDesc
    public int PriceForEnter { get; set; } //CustomDesc
    public bool ShopsNearby { get; set; } //CustomDesc
    public string? Shops { get; set; } //CustomDesc
    public string? Description { get; set; }

    //Navigation properties
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
}