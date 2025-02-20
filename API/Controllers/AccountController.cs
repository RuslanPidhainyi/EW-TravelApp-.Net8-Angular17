using API.DTOs;
using API.Entities;
using API.Interface;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController(UserManager<AppUser> userManager, ITokenService tokenService, IMapper mapper) : BaseApiController
{
    [HttpPost("register")] //account/register
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {   
        //note: Sprawdza czy uszer istnieje
        if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

        //note: Tworzy nowego user na podstawie RegisterDTO
        var user = mapper.Map<AppUser>(registerDto);

        //note: Zapisuje propertie z malej litery (Zebys uniknąc dublikatów)
        user.UserName = registerDto.Username.ToLower();

        //note: Dodawania do db
        var result = await userManager.CreateAsync(user, registerDto.Password);

        //note: Sprawdza czy mamy sukces
        if(!result.Succeeded) return BadRequest(result.Errors);

        //note: Jezeli mamy sukces, zwroci object UserDto z jego danymi do klienta 
        return new UserDto
        {
            Username = user.UserName,
            Token = await tokenService.CreateToken(user),
            KnownAs = user.KnownAs,
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await userManager.Users
            .Include(p => p.GeneralPhotos)
            .FirstOrDefaultAsync(x =>
            x.NormalizedUserName == loginDto.Username.ToUpper());

        if (user == null || user.UserName == null) return Unauthorized("Invalid username");

        var userPasssword = await userManager.CheckPasswordAsync(user, loginDto.Password);

        if(!userPasssword) return Unauthorized("Invalid password");

        return new UserDto
        {
            Username = user.UserName,
            Token =  await tokenService.CreateToken(user),
            GeneralPhotoUrl = user.GeneralPhotos.FirstOrDefault(x => x.IsMain)?.Url,
            KnownAs = user.KnownAs,
        };
    }

    private async Task<bool> UserExists(string username)
    {
        return await userManager.Users.AnyAsync(x => x.NormalizedUserName == username.ToUpper()); 
    }
}