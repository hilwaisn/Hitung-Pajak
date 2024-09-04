using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using Backend.Data;
using Microsoft.AspNetCore.Authorization;
using EmployeeRegisterAPI.Data;
using EmployeeRegitsAPI.Helpers;
using Microsoft.EntityFrameworkCore;

namespace EmployeeRegitsAPI.Controllers
{
    [Authorize(Roles = "admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly EmployeeDbContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly JwtTokenService _jwtTokenService;

        public AdminController(EmployeeDbContext context, IWebHostEnvironment hostEnvironment, JwtTokenService jwtTokenService)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
            _jwtTokenService = jwtTokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(Admin admin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var adminData = await _context.Admins.FirstOrDefaultAsync(a => a.username == admin.username);
            if (adminData == null || !BCrypt.Net.BCrypt.Verify(admin.password, adminData.password))
            {
                return BadRequest(new { message = "Invalid Credentials" });
            }

            var jwt = _jwtTokenService.Generate(adminData.username, "admin");

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
}