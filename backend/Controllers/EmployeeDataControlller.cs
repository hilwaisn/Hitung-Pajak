using Backend.Data;
using Backend.Models;
using EmployeeRegisterAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class EmployeeDataController : ControllerBase
{
    private readonly EmployeeDbContext _context;

    public EmployeeDataController(EmployeeDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<EmployeeData>> PostEmployeeData(EmployeeData employeeData)
    {
        _context.Employeed.Add(employeeData);
        await _context.SaveChangesAsync();

        // Hitung dan simpan data pajak
        var taxData = HitungPajak(employeeData);
        _context.TaxDatas.Add(taxData);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetEmployeeData", new { id = employeeData.EmployeeId }, employeeData);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEmployeeData(int id, EmployeeData employeeData)
    {
        if (id != employeeData.EmployeeId)
        {
            return BadRequest();
        }

        _context.Entry(employeeData).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployeeData(int id)
    {
        var employeeD = await _context.Employeed.FindAsync(id);

        if (employeeD is null)
        {
            return NotFound();
        }

        _context.Employeed.Remove(employeeD);
        await _context.SaveChangesAsync();

        return Ok();
    }

    private TaxData HitungPajak(EmployeeData employee)
    {
        // Biaya jabatan
        var biayaJabatan = 0.05m * employee.EmployeeSalary;
        if (biayaJabatan > 500_000)
        {
            biayaJabatan = 500_000;
        }

        // JKK
        var jkk = 0.0024m * employee.EmployeeSalary;

        // JKM
        var jkm = 0.0030m * employee.EmployeeSalary;

        // JPK
        var jpk = 0.04m * employee.EmployeeSalary;

        // JHT
        var jht = 0.037m * employee.EmployeeSalary;

        // Penghasilan bruto
        var penghasilanBruto = employee.EmployeeSalary + employee.EmployeeAllowance + jkk + jkm + jpk;

        // Penghasilan netto sebulan
        var penghasilanNettoSebulan = penghasilanBruto - biayaJabatan - jht;

        // Penghasilan netto setahun
        var penghasilanNettoSetahun = penghasilanNettoSebulan * 12;

        // PTKP
        var ptkp = 54_000_000; // Wajib Pajak Pribadi
        if (employee.EmployeeStatus == "Kawin")
        {
            ptkp += 4_500_000; // Tambahan PTKP untuk Kawin
            if (employee.EmployeeDependents > 0)
            {
                ptkp += Math.Min(employee.EmployeeDependents, 3) * 4_500_000; // Maksimal 3 EmployeeDependents
            }
        }

        // PKP
        var pkp = penghasilanNettoSetahun - ptkp;
        pkp = Math.Floor(pkp / 1_000) * 1_000; // Pembulatan ke bawah

        // Pajak Terutang
        decimal pajakTerutang = 0;
        if (pkp > 0)
        {
            if (pkp <= 60_000_000)
            {
                pajakTerutang = 0.05m * pkp;
            }
            else if (pkp <= 250_000_000)
            {
                pajakTerutang = 0.05m * 60_000_000 + 0.15m * (pkp - 60_000_000);
            }
            else if (pkp <= 500_000_000)
            {
                pajakTerutang = 0.05m * 60_000_000 + 0.15m * 190_000_000 + 0.25m * (pkp - 250_000_000);
            }
            else if (pkp <= 5_000_000_000)
            {
                pajakTerutang = 0.05m * 60_000_000 + 0.15m * 190_000_000 + 0.25m * 250_000_000 + 0.30m * (pkp - 500_000_000);
            }
            else
            {
                pajakTerutang = 0.05m * 60_000_000 + 0.15m * 190_000_000 + 0.25m * 250_000_000 + 0.30m * 4_500_000_000 + 0.35m * (pkp - 5_000_000_000);
            }
        }

        // PPh 21 Terutang Setahun
        var pph21TerutangSetahun = pajakTerutang;

        // PPh 21 Dipotong Perbulan
        var pph21DipotonPerBulan = pph21TerutangSetahun / 12;

        // Buat dan kembalikan objek DataPajak
        var taxData = new TaxData
        {
            EmployeeName = employee.EmployeeName,
            EmployeeNik = employee.EmployeeNik,
            EmployeeSalary = employee.EmployeeSalary,
            EmployeeAllowance = employee.EmployeeAllowance,
            TaxPositiom = biayaJabatan,
            TaxJkk = jkk,
            TaxJkm = jkm,
            TaxJpk = jpk,
            TaxJht = jht,
            TaxMni = penghasilanNettoSebulan,
            TaxAni = penghasilanNettoSetahun,
            TaxPtkp = ptkp,
            TaxPkp = pkp,
            TaxOwed = pajakTerutang,
            TaxPph21Month = pph21TerutangSetahun,
            TaxPph21Year = pph21DipotonPerBulan
        };

        return taxData;
    }
}