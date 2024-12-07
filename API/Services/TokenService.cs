using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config, UserManager<AppUser> userManager) : ITokenService
//note: IConfiguration - Wprowadzenie konfiguracji do uzyskania dostępu do klucza tokena z pliku ustawień (appsettings.json)
//note: UserManager<AppUser> - serwis ktory wykorzystuje dla pracy z userem i ich rolami
{
    public async Task<string> CreateToken(AppUser user)
    {   
        //note1: Otrzymujemy klucza z config pliku, jezeli klucza nie ma otzrymujemy błąd 
        var tokenKey = config["TokenKey"] ?? throw new Exception("Cannot access tokenKey from appsettings");
        
        //note2: Sprawdzenia klucza na długość(Potzrebmo dla biezpieczenstwa, zebyś uniknąc słabych lkuczów)
        if (tokenKey.Length < 64) throw new Exception("Your tokenKey needs to be longer");
        
        //note3: Symetryczny klucz (SymmetricSecurityKey) jest tworzony na podstawie klucza pobranego z konfiguracji. Będzie on używany do podpisywania tokena.
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

        //note4: Sprawdzenia Imie Usera
        if (user.UserName == null) throw new Exception("No username for user");

        //note5: Tworzenie listy roszczeń/вимог (claims):
        /*
            Claims – to pewne dane o użytkowniku, które są dodawane do tokena. W tym przypadku dodawane są:

                - NameIdentifier – unikalny identyfikator użytkownika (user.Id).
                - Name – nazwa użytkownika (user.UserName).
        */
        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.UserName),
        };
        
        //note6: Do listy claims dodawane są role użytkownika. Dzięki temu w tokenie można przechowywać informacje o rolach użytkownika
        var roles = await userManager.GetRolesAsync(user);

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        //note7: SigningCredentials są używane do podpisywania tokena. Wykorzystywany jest algorytm HmacSha512Signature, który jest wystarczająco bezpieczny do podpisywania tokenów.
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);    

        //note8: Opis tokena (token descriptor)
        /*
            SecurityTokenDescriptor zawiera informacje o tokenie:

                -Subject – zawiera roszczenia użytkownika (claims).
                -Expires – określa czas ważności tokena (w tym przypadku – 7 dni).
                -SigningCredentials – dane do podpisania tokena (zawiera klucz i algorytm podpisu).
        */   
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims), 
            Expires = DateTime.UtcNow.AddDays(7), 
            SigningCredentials = creds
        };


        //note9: Tworzenie i zapis tokena

        //note: JwtSecurityTokenHandler – służy do tworzenia tokena JWT na podstawie opisu tokena (tokenDescriptor).
        var tokenHandle = new JwtSecurityTokenHandler();
        var token = tokenHandle.CreateToken(tokenDescriptor);

        //note: Metoda WriteToken(token) – zwraca token w formie ciągu znaków, który następnie można przekazać klientowi.
        return tokenHandle.WriteToken(token);
    }
}