using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace diplomska_final.Migrations
{
    public partial class StartRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Categories_CategoryId",
                table: "Recipes");

            migrationBuilder.DropTable(
                name: "RecipesRatings");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_CategoryId",
                table: "Recipes");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "RecipesComments",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "RecipesComments");

            migrationBuilder.CreateTable(
                name: "RecipesRatings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RecipesId = table.Column<int>(type: "int", nullable: false),
                    Rating_Stars = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RecipesRatings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RecipesRatings_Recipes_RecipesId",
                        column: x => x.RecipesId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_CategoryId",
                table: "Recipes",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_RecipesRatings_RecipesId",
                table: "RecipesRatings",
                column: "RecipesId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Categories_CategoryId",
                table: "Recipes",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
