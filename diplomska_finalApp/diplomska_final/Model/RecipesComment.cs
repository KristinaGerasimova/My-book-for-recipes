namespace diplomska_final.Model
{
  public class RecipesComment
  {
    public int Id { get; set; }
    public string? Text_Comment { get; set; }

    public int RecipesId { get; set; }
    public Recipes? Recipes { get; set; }

    public DateTime DateCreated { get; set; }

    public int? Rating { get; set; }
  }
}
