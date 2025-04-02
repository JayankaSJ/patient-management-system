using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PatientsApi.Data;
using PatientsApi.Models;
using PatientsApi.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PatientsApi.Services {
    public class UserService : IUserService {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UserService(IUserRepository userRepository, IConfiguration configuration) {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        public async Task<JwtTokenResponse> LoginUserAsync(string username, string password) {
            var user = await _userRepository.GetUserByUsernameAsync(username);

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
                throw new UnauthorizedAccessException("Invalid credentials");

            // Generate JWT token
            var token = GenerateJwtToken(user);

            return new JwtTokenResponse {
                Token = token,
                Expiry = DateTime.UtcNow.AddHours(1) // Set token expiration
            };
        }


        // Helper method to generate JWT token
        private string GenerateJwtToken(User user) {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(JwtRegisteredClaimNames.Sub, user.Username),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            // Add roles as claims
            foreach (var role in user.Roles) {
                claims.Add(new Claim(ClaimTypes.Role, role.Name));
            }

            var permissions = user.Roles.SelectMany(x => x.Permissions) ?? new List<Permission>();

            foreach (var permission in permissions) {
                claims.Add(new Claim("permissions", permission.Name));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["JwtSettings:Issuer"],
                audience: _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
