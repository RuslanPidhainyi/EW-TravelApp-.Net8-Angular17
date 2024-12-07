using System;
using API.Data;
using API.Data.Repositories;
using API.Helpers;
using API.Interface;
using API.Services;
using API.SignalR;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddControllers();
        services.AddDbContext<AppDbContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });
        services.AddCors(); //note: Dodano usługę ochrony CORS(Cross-Origin Resource Sharing). (Nasz serwer będzie ładowany tylko z zaufanych źródeł określonych przez serwer).
        services.AddScoped<ITokenService, TokenService>(); //note: AddScoped - Okresla czas uzycza usługi. Usługe te są tworzone raz na ządanie klienta (ządanie HTTP), potem po wykorzystaniu bedzie te ządanie usuniete.
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IPhotoService, PhotoService>();
        services.AddScoped<IPostRepository, PostRepository>();
        services.AddScoped<ILikesRepository, LikesRepository>();
        services.AddScoped<IMessageRepository, MessageRepository>();
        services.AddScoped<LogUserActivity>(); //note: Actywność Usera
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies()); //note: AutoMapper
        services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));//note: Cloudinary
        services.AddSignalR();
        services.AddSingleton<PresenceTracker>();

        return services;
    }
}