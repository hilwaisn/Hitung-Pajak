using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using EmployeeRegisterAPI.Helpers;
using Backend.Data.Dtos;
using Backend.Data.Repository;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class AuthController : ControllerBase
{
    private readonly IAdminRepository _repository;
    private readonly JwtService _jwtService;

    public AuthController(IAdminRepository repository, JwtService jwtService)
    {
        _repository = repository;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Register([FromBody] Admin registerAdmin)
    {
        try
        {
            var user = new Admin
            {
                username = registerAdmin.username,
                password = BCrypt.Net.BCrypt.HashPassword(registerAdmin.password),
                IsAdmin = registerAdmin.IsAdmin,

            };
            return Created("success", _repository.Create(user));
        }
        catch (DbUpdateException dbEx)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"Failed to register user: {dbEx.InnerException?.Message ?? dbEx.Message}" });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = $"Failed to register user: {ex.Message}" });
        }
    }

    [HttpPost("login")]
    public IActionResult Login(Login login)
    {
        var user = _repository.GetByUsername(login.username);

        if (user == null) return BadRequest(new { message = "Invalid Credentials" });

        if (!BCrypt.Net.BCrypt.Verify(login.Password, user.password))
        {
            return BadRequest(new { message = "Invalid Credentials" });
        }

        var jwt = _jwtService.Generate(user.id, user.IsAdmin);

        Response.Cookies.Append("jwt", jwt, new CookieOptions
        {
            HttpOnly = true
        });

        return Ok(new
        {
            jwt,
            message = "success"
            //role = user.Role
        });
    }

    [HttpGet("user")]
    public IActionResult User()
    {
        try
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);

            //int userId = int.Parse(token.Issuer);
            int userId = int.Parse(token.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value);

            var user = _repository.GetById(userId);

            return Ok(user);
        }
        catch (Exception)
        {
            return Unauthorized();
        }
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("jwt");

        return Ok(new
        {
            message = "success",
        });
    }
}