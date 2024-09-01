using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EmployeeRegisterAPI.Data
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options)
        {

        }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<EmployeeData> Employeed { get; set; }
        public DbSet<TaxData> TaxDatas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configure entities with Fluent API if necessary
        }

        public async Task SeedAsync()
        {
            if (!Admins.Any())
            {
                var admin = new Admin
                {
                    username = "admin",
                    password = BCrypt.Net.BCrypt.HashPassword("123")
                };

                Admins.Add(admin);
                await SaveChangesAsync();
            }
        }
    }

}