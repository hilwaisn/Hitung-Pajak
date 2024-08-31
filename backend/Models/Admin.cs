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
        [Column(TypeName = "nvarchar(50)")]
        public string username { get; set; }
        [Column(TypeName = "nvarchar(70)")]
        public string password { get; set; }
    }
}