﻿// <auto-generated />
using EmployeeRegisterAPI.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(EmployeeDbContext))]
    [Migration("20240904092456_TaxSalary")]
    partial class TaxSalary
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0-rc.1.23419.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("Backend.Models.Admin", b =>
                {
                    b.Property<string>("username")
                        .HasColumnType("nvarchar(50)");

                    b.Property<bool>("IsAdmin")
                        .HasColumnType("bit");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("username");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("Backend.Models.Employee", b =>
                {
                    b.Property<string>("EmployeeUsername")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("EmployeePassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(70)");

                    b.HasKey("EmployeeUsername");

                    b.ToTable("Employees");
                });

            modelBuilder.Entity("Backend.Models.EmployeeData", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EmployeeId"));

                    b.Property<decimal>("EmployeeAllowance")
                        .HasColumnType("decimal(18,2)");

                    b.Property<int>("EmployeeDependents")
                        .HasColumnType("int");

                    b.Property<string>("EmployeeGender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmployeeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("EmployeeNik")
                        .IsRequired()
                        .HasColumnType("nvarchar(16)");

                    b.Property<string>("EmployeePassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal>("EmployeeSalary")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("EmployeeStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmployeeUsername")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EmployeeId");

                    b.ToTable("Employeed");
                });

            modelBuilder.Entity("Backend.Models.TaxData", b =>
                {
                    b.Property<int>("EmployeeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("EmployeeId"));

                    b.Property<decimal>("EmployeeAllowance")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("EmployeeName")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("EmployeeNik")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<decimal>("EmployeeSalary")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TaxAni")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TaxJht")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TaxJkk")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TaxJkm")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TaxJpk")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TaxMni")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TaxOwed")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TaxPkp")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TaxPositiom")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TaxPph21Month")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TaxPph21Year")
                        .HasColumnType("decimal(18,2)");

                    b.Property<decimal>("TaxPtkp")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("EmployeeId");

                    b.ToTable("TaxDatas");
                });
#pragma warning restore 612, 618
        }
    }
}
