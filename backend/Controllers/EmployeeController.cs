using Backend.Data;
using Backend.Models;
using EmployeeRegisterAPI.Data;
using EmployeeRegitsAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeRegitsAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly JwtTokenService _jwtTokenService;

        public EmployeeController(EmployeeDbContext context, IWebHostEnvironment hostEnvironment, JwtTokenService jwtTokenService)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
            _jwtTokenService = jwtTokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(Employee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employeeData = await _context.Employeed.FirstOrDefaultAsync(a => a.EmployeeUsername == employee.EmployeeUsername);
            if (employeeData == null || !BCrypt.Net.BCrypt.Verify(employee.EmployeePassword, employeeData.EmployeePassword))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = _jwtTokenService.Generate(employeeData.EmployeeUsername, "employee");

            Response.Cookies.Append("token", jwt, new CookieOptions
            {
                HttpOnly = true,
            });

            return Ok(new
            {
                token = jwt,
                message = "You have successfully logged in"
            });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            return await _context.Employees.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            return employee;
        }
    }
}