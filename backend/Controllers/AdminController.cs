using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Authorization;
using EmployeeRegisterAPI.Data;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AdminController : ControllerBase
{
    private readonly EmployeeDbContext _context;
    private readonly IWebHostEnvironment _hostEnvironment;

    public AdminController(EmployeeDbContext context, IWebHostEnvironment hostEnvironment)
    {
        _context = context;
        _hostEnvironment = hostEnvironment;
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<ActionResult<Admin>> PostAdmmin(Admin admin)
    {
        var adminNew = new Admin
        {
            username = admin.username,
            password = BCrypt.Net.BCrypt.HashPassword(admin.password)

        };
        _context.Admins.Add(adminNew);
        await _context.SaveChangesAsync();
        return StatusCode(201);
    }

}
