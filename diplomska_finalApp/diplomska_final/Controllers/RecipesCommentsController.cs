#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using diplomska_final.Model;

namespace diplomska_final.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecipesCommentsController : ControllerBase
    {
        private readonly AuthenticationContext _context;

        public RecipesCommentsController(AuthenticationContext context)
        {
            _context = context;
        }

        // GET: api/RecipesComments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RecipesComment>>> GetRecipesComments()
        {
            return await _context.RecipesComments.ToListAsync();
        }

        // GET: api/RecipesComments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RecipesComment>> GetRecipesComment(int id)
        {
            var recipesComment = await _context.RecipesComments.FindAsync(id);

            if (recipesComment == null)
            {
                return NotFound();
            }

            return recipesComment;
        }

    // GET: api/RecipesComments
    [HttpGet("/comments/{recipeId}")]
    public async Task<ActionResult<List<RecipesComment>>> getCommentsByRecipeId(int recipeId)
    {
      var recipes = await _context.RecipesComments.Include(x => x.Recipes).Where(x => x.RecipesId == recipeId).ToListAsync();

      if (recipes == null)
      {
        return NotFound();
      }

      return recipes;
    }



    // PUT: api/RecipesComments/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
        public async Task<IActionResult> PutRecipesComment(int id, RecipesComment recipesComment)
        {
            if (id != recipesComment.Id)
            {
                return BadRequest();
            }

            _context.Entry(recipesComment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RecipesCommentExists(id))
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

        // POST: api/RecipesComments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RecipesComment>> PostRecipesComment(RecipesComment recipesComment)
        {
            _context.RecipesComments.Add(recipesComment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRecipesComment", new { id = recipesComment.Id }, recipesComment);
        }

        // DELETE: api/RecipesComments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRecipesComment(int id)
        {
            var recipesComment = await _context.RecipesComments.FindAsync(id);
            if (recipesComment == null)
            {
                return NotFound();
            }

            _context.RecipesComments.Remove(recipesComment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RecipesCommentExists(int id)
        {
            return _context.RecipesComments.Any(e => e.Id == id);
        }
    }
}
