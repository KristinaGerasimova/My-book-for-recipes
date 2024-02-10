#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using diplomska_final.Model;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace diplomska_final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesController : ControllerBase
    {
        private readonly AuthenticationContext _context;

        public RecipesController(AuthenticationContext context)
        {
            _context = context;
        }

        // GET: api/Recipes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Recipes>>> GetRecipes()
        {      
          return await _context.Recipes.Include(x=>x.Category).OrderByDescending(x=>x.DateCreated).ToListAsync();
        }

    // GET: api/Recipes
    [HttpGet("/recent")]
    public async Task<ActionResult<IEnumerable<Recipes>>> getRecipesRecent()
    {
      return await _context.Recipes.Include(x => x.Category).OrderByDescending(x=>x.DateCreated).Take(3).ToListAsync();
    }

    [HttpGet("/Category/{categoryId}")]
    public async Task<ActionResult<List<Recipes>>> GetRecipesByCategoryId(int categoryId)
    {
      var recipes = await _context.Recipes.Include(x => x.Category).Where(x => x.CategoryId == categoryId).ToListAsync();

      if (recipes == null)
      {
        return NotFound();
      }

      return recipes;
    }

    // GET: api/Recipes/5
    [HttpGet("{id}")]
        public async Task<ActionResult<Recipes>> GetRecipes(int id)
        {
            var recipes = await _context.Recipes.FindAsync(id);

            if (recipes == null)
            {
                return NotFound();
            }

        return recipes;
        }

    

    // PUT: api/Recipes/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> PutRecipes(int id, Recipes recipes)
        {
      
        // ...
        if (id != recipes.Id)
      {
        return BadRequest();
      }


      _context.Entry(recipes).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!RecipesExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }           

      return NoContent();
    }

        // POST: api/Recipes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
    public async Task<ActionResult<Recipes>> PostRecipes(Recipes recipesView)
        {
            _context.Recipes.Add(recipesView);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Recipes/5
        [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRecipes(int id)
        {
            var recipes = await _context.Recipes.FindAsync(id);
            if (recipes == null)
            {
                return NotFound();
            }

            _context.Recipes.Remove(recipes);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecipesExists(int id)
        {
            return _context.Recipes.Any(e => e.Id == id);
        }
    }
}
