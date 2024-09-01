using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRegitsAPI.Models
{
    public class EmployeeData
    {
        [Key]
        public int EmployeeId { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string EmployeeName { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public long EmployeeNik { get; set; }
        public decimal EmployeeSalary { get; set; }
        public decimal EmployeeAllowance { get; set; }
        public string EmployeeGender { get; set; }
        public string EmployeeStatus { get; set; }
        public int EmployeeDependents{get; set;}
        public string EmployeeUsername { get; set; }
        public string EmployeePassword { get; set; }

    }
}