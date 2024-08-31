using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeRegitsAPI.Models;
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
    }

}