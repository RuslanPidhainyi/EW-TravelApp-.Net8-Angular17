using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class PostExtensions
{
    public static void SetConditionalFieldsForAddPost(PostDto postDto)
    {
        if (!postDto.LocalTransport)
        {
            postDto.MinPriceLocalTrans = 0;
            postDto.MaxPriceLocalTrans = 0;
            postDto.TravelTime = 0;
        }

        if (!postDto.EntranceFee)
        {
            postDto.MinPriceEntrFee = 0;
            postDto.MaxPriceEntrFee = 0;
        }

        if (!postDto.PlaceStay)
        {
            postDto.TypePlaceStay = "None";
            postDto.MinPricePlaceStay = 0;
            postDto.MaxPricePlaceStay = 0;
        }

        if (!postDto.GroceryStore)
        {
            postDto.MinPriceGroceryStore = 0;
            postDto.MaxPriceGroceryStore = 0;
        }

        if (!postDto.Guide)
        {
            postDto.MinPriceGuide = 0;
            postDto.MaxPriceGuide = 0;
        }
    }

    public static void SetConditionalFieldsForEditPost(this Post post, PostDto postDto)
    {
        if (!postDto.LocalTransport)
        {
            post.MinPriceLocalTrans = 0;
            post.MaxPriceLocalTrans = 0;
            post.TravelTime = 0;
        }

        if (!postDto.EntranceFee)
        {
            post.MinPriceEntrFee = 0;
            post.MaxPriceEntrFee = 0;
        }

        if (!postDto.PlaceStay)
        {
            post.TypePlaceStay = "None";
            post.MinPricePlaceStay = 0;
            post.MaxPricePlaceStay = 0;
        }

        if (!postDto.GroceryStore)
        {
            post.MinPriceGroceryStore = 0;
            post.MaxPriceGroceryStore = 0;
        }

        if (!postDto.Guide)
        {
            post.MinPriceGuide = 0;
            post.MaxPriceGuide = 0;
        }
    }

    public static string ExtractPublicIdFromUrl(string url)
    {
        var uri = new Uri(url);
        var segments = uri.Segments;
        var fileName = segments.Last();
        
        return Path.GetFileNameWithoutExtension(fileName);
    }
}
