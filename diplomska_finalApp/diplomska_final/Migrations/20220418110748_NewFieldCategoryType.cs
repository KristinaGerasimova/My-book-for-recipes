using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace diplomska_final.Migrations
{
    public partial class NewFieldCategoryType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "categoryType",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "categoryType",
                table: "Recipes");
        }
    }
}
