using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace diplomska_final.Migrations
{
    public partial class deletefieldCategoryType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "categoryType",
                table: "Recipes");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "categoryType",
                table: "Recipes",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
