using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.Models
{
    public class Admin
    {
        internal int id;

        [Key]
        [Column(TypeName = "nvarchar(50)")]
        public string username { get; set; }
        [Column(TypeName = "nvarchar(256)")]
        public string password { get; set; }
        public bool IsAdmin { get; set; }

    }
}