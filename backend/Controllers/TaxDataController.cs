using Backend.Data;
using Backend.Models;
using EmployeeRegisterAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
[Authorize]
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
}
