
using diplomska_final.Model;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

using System.Text;

var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

IServiceCollection serviceCollection = builder.Services.Configure<ApplicationSettings>(builder.Configuration.GetSection("ApplicationSettings"));
builder.Services.AddDbContext<AuthenticationContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<IdentityOptions>(options =>
{
  options.Password.RequireDigit = false;
  options.Password.RequireLowercase = false;
  options.Password.RequireUppercase = false;
  options.Password.RequireNonAlphanumeric = false;
  options.Password.RequiredLength = 4;
});

builder.Services.AddDefaultIdentity<ApplicationUser>()
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AuthenticationContext>();

//Jwt Authentication
var key = Encoding.UTF8.GetBytes(builder.Configuration["ApplicationSettings:JWT_Secret"].ToString());
builder.Services.AddAuthentication(x =>
{
  x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
  x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
  x.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(x =>
{
  x.RequireHttpsMetadata = false;
  x.SaveToken = false;
  x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
  {
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey(key),
    ValidateIssuer = false,
    ValidateAudience = false,
    ClockSkew = TimeSpan.Zero,
  };
});

//Enable CORS
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: myAllowSpecificOrigins,
    builder =>
    {
      builder.WithOrigins("http://localhost:4200")
      .AllowAnyMethod()
      .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(myAllowSpecificOrigins);

app.UseAuthorization();

app.UseAuthentication();

app.MapControllers();

app.Run();
