using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace diplomska_final.Migrations
{
    public partial class createinmodels : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Recipes_CategoryId",
                table: "Recipes",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Categories_CategoryId",
                table: "Recipes",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Categories_CategoryId",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_CategoryId",
                table: "Recipes");
        }
    }
}
