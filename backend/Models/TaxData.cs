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
        public decimal EmployeeSalary { get; set; }
        public decimal EmployeeAllowance { get; set; }
        public decimal TaxPositiom { get; set; }
        public decimal TaxJkk { get; set; }
        public decimal TaxJkm { get; set; }
        public decimal TaxJpk { get; set; }
        public decimal TaxJht { get; set; }
        public decimal TaxMni { get; set; }
        public decimal TaxAni { get; set; }
        public decimal TaxPtkp { get; set; }
        public decimal TaxPkp { get; set; }
        public decimal TaxOwed { get; set; }
        public decimal TaxPph21Year { get; set; }
        public decimal TaxPph21Month { get; set; }
    }
}