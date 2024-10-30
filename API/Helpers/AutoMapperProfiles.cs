using System;
using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUser, MemberDto>()
            .ForMember(d => d.Age, o => o.MapFrom(s => s.DateOfBirth.CalculateAge()))
            .ForMember(d => d.GeneralPhotoUrl,
                o => o.MapFrom(s => s.GeneralPhotos.FirstOrDefault(x => x.IsMain)!.Url));
        CreateMap<Photo, PhotoDto>();
        CreateMap<Post, PostDto>()
            .ForMember(d => d.UserName,
                    o => o.MapFrom(s => s.AppUser.UserName))
            .ForMember(d => d.AppUserId,
                    o => o.MapFrom(s => s.AppUserId));
        CreateMap<PostDto, Post>();

        // CreateMap<PostDto, Post>()
        //         .ForMember(dest => dest.Id, opt => opt.Ignore())
        //         .ForMember(dest => dest.MinPriceLocalTrans, opt => opt.MapFrom(src => src.LocalTransport ? src.MinPriceLocalTrans : 0))
        //         .ForMember(dest => dest.MaxPriceLocalTrans, opt => opt.MapFrom(src => src.LocalTransport ? src.MaxPriceLocalTrans : 0))
        //         .ForMember(dest => dest.TravelTime, opt => opt.MapFrom(src => src.LocalTransport ? src.TravelTime : 0))
        //         .ForMember(dest => dest.MinPriceEntrFee, opt => opt.MapFrom(src => src.EntranceFee ? src.MinPriceEntrFee : 0))
        //         .ForMember(dest => dest.MaxPriceEntrFee, opt => opt.MapFrom(src => src.EntranceFee ? src.MaxPriceEntrFee : 0))
        //         .ForMember(dest => dest.TypePlaceStay, opt => opt.MapFrom(src => src.PlaceStay ? src.TypePlaceStay : "None"))
        //         .ForMember(dest => dest.MinPricePlaceStay, opt => opt.MapFrom(src => src.PlaceStay ? src.MinPricePlaceStay : 0))
        //         .ForMember(dest => dest.MaxPricePlaceStay, opt => opt.MapFrom(src => src.PlaceStay ? src.MaxPricePlaceStay : 0))
        //         .ForMember(dest => dest.MinPriceGroceryStore, opt => opt.MapFrom(src => src.GroceryStore ? src.MinPriceGroceryStore : 0))
        //         .ForMember(dest => dest.MaxPriceGroceryStore, opt => opt.MapFrom(src => src.GroceryStore ? src.MaxPriceGroceryStore : 0))
        //         .ForMember(dest => dest.MinPriceGuide, opt => opt.MapFrom(src => src.Guide ? src.MinPriceGuide : 0))
        //         .ForMember(dest => dest.MaxPriceGuide, opt => opt.MapFrom(src => src.Guide ? src.MaxPriceGuide : 0));

        CreateMap<MemberUpdatedDto, AppUser>();
    }
}