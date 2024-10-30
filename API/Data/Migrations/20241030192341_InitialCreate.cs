using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserName = table.Column<string>(type: "TEXT", nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "BLOB", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "BLOB", nullable: false),
                    DateOfBirth = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    KnownAs = table.Column<string>(type: "TEXT", nullable: false),
                    Created = table.Column<DateTime>(type: "TEXT", nullable: false),
                    LastActive = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Gender = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Interests = table.Column<string>(type: "TEXT", nullable: true),
                    Country = table.Column<string>(type: "TEXT", nullable: false),
                    City = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GeneralPhotos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(type: "TEXT", nullable: false),
                    IsMain = table.Column<bool>(type: "INTEGER", nullable: false),
                    PublicId = table.Column<string>(type: "TEXT", nullable: true),
                    AppUserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneralPhotos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GeneralPhotos_Users_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Posts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Url = table.Column<string>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    LocationCountry = table.Column<string>(type: "TEXT", nullable: false),
                    LocationCity = table.Column<string>(type: "TEXT", nullable: false),
                    LastCountry = table.Column<string>(type: "TEXT", nullable: false),
                    LastCity = table.Column<string>(type: "TEXT", nullable: false),
                    LocalTransport = table.Column<bool>(type: "INTEGER", nullable: false),
                    MinPriceLocalTrans = table.Column<int>(type: "INTEGER", nullable: false),
                    MaxPriceLocalTrans = table.Column<int>(type: "INTEGER", nullable: false),
                    TravelTime = table.Column<int>(type: "INTEGER", nullable: false),
                    EntranceFee = table.Column<bool>(type: "INTEGER", nullable: false),
                    MinPriceEntrFee = table.Column<int>(type: "INTEGER", nullable: false),
                    MaxPriceEntrFee = table.Column<int>(type: "INTEGER", nullable: false),
                    PlaceStay = table.Column<bool>(type: "INTEGER", nullable: false),
                    TypePlaceStay = table.Column<string>(type: "TEXT", nullable: true),
                    MinPricePlaceStay = table.Column<int>(type: "INTEGER", nullable: false),
                    MaxPricePlaceStay = table.Column<int>(type: "INTEGER", nullable: false),
                    GroceryStore = table.Column<bool>(type: "INTEGER", nullable: false),
                    MinPriceGroceryStore = table.Column<int>(type: "INTEGER", nullable: false),
                    MaxPriceGroceryStore = table.Column<int>(type: "INTEGER", nullable: false),
                    Guide = table.Column<bool>(type: "INTEGER", nullable: false),
                    MinPriceGuide = table.Column<int>(type: "INTEGER", nullable: false),
                    MaxPriceGuide = table.Column<int>(type: "INTEGER", nullable: false),
                    Currency = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    AppUserId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Posts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Posts_Users_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GeneralPhotos_AppUserId",
                table: "GeneralPhotos",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Posts_AppUserId",
                table: "Posts",
                column: "AppUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GeneralPhotos");

            migrationBuilder.DropTable(
                name: "Posts");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
