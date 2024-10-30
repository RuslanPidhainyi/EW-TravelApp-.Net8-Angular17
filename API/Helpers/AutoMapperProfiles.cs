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
        CreateMap<MemberUpdatedDto, AppUser>();
    }
}