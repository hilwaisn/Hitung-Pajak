using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRegitsAPI.Models
{
    public class Admin
    {
        [Key]
        public string username { get; set; }
        [Column(TypeName = "nvarchar(10)")]
        public int password { get; set; }
    }
}