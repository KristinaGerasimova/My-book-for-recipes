using diplomska_final.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace diplomska_final.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ApplicationUserController : ControllerBase
  {
    private UserManager<ApplicationUser> _userManager;

    //private SignInManager<ApplicationUser> _signInManager;
    private readonly ApplicationSettings _appSettings;

    public ApplicationUserController(UserManager<ApplicationUser> userManager, IOptions<ApplicationSettings> appSettings )
    {
       _userManager = userManager;
      //_signInManager = signInManager;
      _appSettings = appSettings.Value;
    }
    [HttpPost]
    [Route("Register")]
    //POST: api/ApplicationUser/Register
    public async Task<Object> PostApplicationUser(ApplicationUserModel model)
    {
      model.Role = "Customer";
      var applicationUser = new ApplicationUser()
      {
        Email = model.Email,
        UserName = model.UserName,
        FullName = model.FullName
      };

      try
      {
        var result =await _userManager.CreateAsync(applicationUser, model.Password);
        await _userManager.AddToRoleAsync(applicationUser, model.Role);
        return Ok(result); ;
      }
      catch (Exception ex)
      {
        throw ex;
      }
    }

    [HttpPost]
    [Route("Login")]
    //POST: api/ApplicationUser/Login
    public async Task<IActionResult> Login(LoginModel model)
    {
      var user = await _userManager.FindByNameAsync(model.UserName);
      if(user != null && await _userManager.CheckPasswordAsync(user,model.Password))
      {

        //Get role assigned to the user
        var role = await _userManager.GetRolesAsync(user);
        IdentityOptions _options = new IdentityOptions();

        var tokenDescriptor = new SecurityTokenDescriptor
        {          
          Subject = new ClaimsIdentity(new Claim[]
          {
            new Claim("UserID", user.Id.ToString()),
            new Claim(_options.ClaimsIdentity.RoleClaimType, role.FirstOrDefault())
          }),
          Expires = DateTime.UtcNow.AddDays(123),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
        };
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        var token = tokenHandler.WriteToken(securityToken);
        var userType = 1; 
        if(user.UserName == "Admin")
        {
         userType = 2;
        }
        return Ok(new { token, userType });
        }
      else
      {
        return BadRequest(new { message = "Username or password is incorrect."});
      }
      }
      
    }
  }


