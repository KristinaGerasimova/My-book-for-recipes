using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace diplomska_final.Model
{
  public class ApplicationUser : IdentityUser
  {
    [Column(TypeName = "nvarchar(150)")]
    public string? FullName { get; set; }

  }
}
