using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class TaxSalary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admins",
                columns: table => new
                {
                    username = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(256)", nullable: false),
                    IsAdmin = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admins", x => x.username);
                });

            migrationBuilder.CreateTable(
                name: "Employeed",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    EmployeeNik = table.Column<string>(type: "nvarchar(16)", nullable: false),
                    EmployeeSalary = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    EmployeeAllowance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    EmployeeGender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployeeStatus = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployeeDependents = table.Column<int>(type: "int", nullable: false),
                    EmployeeUsername = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmployeePassword = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employeed", x => x.EmployeeId);
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    EmployeeUsername = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    EmployeePassword = table.Column<string>(type: "nvarchar(70)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.EmployeeUsername);
                });

            migrationBuilder.CreateTable(
                name: "TaxDatas",
                columns: table => new
                {
                    EmployeeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployeeName = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    EmployeeNik = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    EmployeeSalary = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    EmployeeAllowance = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxPositiom = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxJkk = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxJkm = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxJpk = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxJht = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxMni = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxAni = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxPtkp = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxPkp = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxOwed = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxPph21Year = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxPph21Month = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxDatas", x => x.EmployeeId);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admins");

            migrationBuilder.DropTable(
                name: "Employeed");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "TaxDatas");
        }
    }
}
