using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRegitsAPI.Models
{
    public class Employee
    {
        [Key]
        [Column(TypeName = "nvarchar(50)")]
        public string EmployeeUsername { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string EmployeePassword { get; set; }

    }
}