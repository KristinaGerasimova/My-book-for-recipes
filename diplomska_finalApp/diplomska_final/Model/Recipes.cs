namespace diplomska_final.Model
{
  public class Recipes
  {
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public DateTime DateCreated { get; set; }
    public string? Image { get; set; }
    public int? quantity { get; set; }
    public int? CategoryId { get; set; }

    public int? totalMintues { get; set; }
    public int? totalSteps { get; set; }
    public string? ingredientsTypes { get; set; }
    public string? steps { get; set; }

    public Category? Category { get; set; }


  }
}
