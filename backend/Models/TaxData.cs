using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeRegitsAPI.Models
{
    public class TaxData
    {
        [Key]
        public int EmployeeId { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string EmployeeName { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public long EmployeeNik { get; set; }
        public long EmployeeSalary { get; set; }
        public long EmployeeAllowance { get; set; }
        public long TaxPositiom { get; set; }
        public long TaxJkk { get; set; }
        public long TaxJkm { get; set; }
        public long TaxJpk { get; set; }
        public long TaxJht { get; set; }
        public long TaxMni { get; set; }
        public long TaxAni { get; set; }
        public long TaxPtkp { get; set; }
        public long TaxPkp { get; set; }
        public long TaxOwed { get; set; }
        public long TaxPph21Year { get; set; }
        public long TaxPph21Month { get; set; }

    }
}