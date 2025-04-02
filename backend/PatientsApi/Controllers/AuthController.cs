using Microsoft.AspNetCore.Mvc;
using PatientsApi.Dtos;
using PatientsApi.Services;

namespace PatientsApi.Controllers {
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase {
        private readonly IUserService _userService;

        public AuthController(IUserService userService) {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto request) {
            try {
                var tokenResponse = await _userService.LoginUserAsync(request.Username, request.Password);
                return Ok(tokenResponse);
            }
            catch (UnauthorizedAccessException) {
                return Unauthorized(new { Message = "Invalid credentials" });
            }
        }
    }
}
