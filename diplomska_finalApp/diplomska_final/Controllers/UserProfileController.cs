

using diplomska_final.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace diplomska_final.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class UserProfileController : ControllerBase
  {

    private UserManager<ApplicationUser> _userManager;

    public UserProfileController(UserManager<ApplicationUser> userManager)
    {
      _userManager = userManager;
    }

    [HttpGet, Authorize]
    //[Authorize]
    //GET : /api/UserProfile
    public async Task<Object> GetUserProfile()
    {
      string userId = User.Claims.First(c => c.Type == "UserID").Value;
      var user = await _userManager.FindByIdAsync(userId);
      return new
      {
        user.FullName,
        user.UserName,
        user.Email
      };
    }

    [HttpGet]
    [Authorize(Roles = "Admin")]
    [Route("ForAdmin")]
    public string GetForAdmin()
    {
      return "Web method for Admin";
    }

    [HttpGet]
    [Authorize(Roles = "Customer")]
    [Route("ForCustomer")]
    public string GetCustomer()
    {
      return "Web method for Customer";
    }

    [HttpGet]
    [Authorize(Roles = "Admin, Customer")]
    [Route("ForAdminOrCustomer")]
    public string GetForAdminOrCustomer()
    {
      return "Web method for Admin or Customer";
    }
  }
}
