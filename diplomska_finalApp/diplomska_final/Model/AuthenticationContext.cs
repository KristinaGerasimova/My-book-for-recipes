using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace diplomska_final.Model
{
  public class AuthenticationContext : IdentityDbContext
  {

    public AuthenticationContext(DbContextOptions<AuthenticationContext> options): base(options)
    {

    }

    public DbSet<ApplicationUser> ApplicationUsers { get; set; }

    public DbSet<Recipes> Recipes { get; set; }
    public DbSet<RecipesComment> RecipesComments { get; set; }
    public DbSet<Category> Categories { get; set; }
  }
}
