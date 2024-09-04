using System.Data.SqlTypes;
using Backend.Data;
using Backend.Models;
using EmployeeRegisterAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class TaxDataController : ControllerBase
{
    private readonly EmployeeDbContext _context;

    public TaxDataController(EmployeeDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<TaxData>>> GetTaxData()
    {
        return await _context.TaxDatas.ToListAsync();
    }

    [HttpGet("{name}")]
    public async Task<ActionResult<TaxData>> GetTaxData(string name)
    {
        var employee = await _context.Employeed.FirstOrDefaultAsync(data => data.EmployeeUsername == name);
        if (employee == null) return NotFound();
        var taxData = await _context.TaxDatas.FirstOrDefaultAsync(tax => tax.EmployeeNik == employee.EmployeeNik);
        if (taxData == null)
        {
            return NotFound();
        }
        return taxData;
    }
}