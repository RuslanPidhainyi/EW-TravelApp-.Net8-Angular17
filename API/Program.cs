using API.Extensions;
using API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddApplicationServices(builder.Configuration);//note: połączenia pliku ApplicationServiceExtensions.cs do Program.cs

builder.Services.AddIdentetiService(builder.Configuration);//note: połączenia pliku IdentetiServiceExtensions.cs do Program.cs

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();//note: odp za Swagger 
builder.Services.AddSwaggerGen();//note: odp za Swagger 

var app = builder.Build();

// Configure the HTTP request pipeline.

//note: Conditional block - odp za Swagger 
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("http://localhost:4200", "https://localhost:4200"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();