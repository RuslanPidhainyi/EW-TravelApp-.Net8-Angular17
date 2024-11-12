namespace API.Entities;

public class Post
{
    public int Id { get; set; }
    public required string Url { get; set; } // Url 
    public required string Title { get; set; }
    public required string LocationCountry { get; set; }
    public required string LocationCity { get; set; }
    public required string LastCountry { get; set; }
    public required string LastCity { get; set; }
    public required bool LocalTransport { get; set; }
    public required int MinPriceLocalTrans { get; set; }
    public required int MaxPriceLocalTrans { get; set; }
    public required int TravelTime { get; set; }
    public required bool EntranceFee { get; set; }
    public required int MinPriceEntrFee { get; set; }
    public required int MaxPriceEntrFee { get; set; }
    public required bool PlaceStay { get; set; }
    public string? TypePlaceStay { get; set; }
    public required int MinPricePlaceStay { get; set; }
    public required int MaxPricePlaceStay { get; set; }
    public required bool GroceryStore { get; set; }
    public required int MinPriceGroceryStore { get; set; }
    public required int MaxPriceGroceryStore { get; set; }
    public required bool Guide { get; set; }
    public required int MinPriceGuide { get; set; }
    public required int MaxPriceGuide { get; set; }
    public required string Currency { get; set; }
    public string? Description { get; set; }
    public string? PublicId { get; set; }

    //Navigation properties
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;

    public List<Like> Likes { get; set; } = [];
}