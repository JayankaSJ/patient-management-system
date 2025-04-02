using Microsoft.EntityFrameworkCore;
using PatientsApi.Data;
using PatientsApi.Models;

namespace PatientsApi.Repositories {
    public class UserRepository : IUserRepository {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context) {
            _context = context;
        }

        // Get user by username
        public async Task<User> GetUserByUsernameAsync(string username) {
            return await _context.Users.Include(u => u.Roles).ThenInclude(r => r.Permissions)
                                       .FirstOrDefaultAsync(u => u.Username == username);
        }

        // Check if a user already exists
        public async Task<bool> UserExistsAsync(string username) {
            return await _context.Users.AnyAsync(u => u.Username == username);
        }

        // Get all users
        public async Task<IEnumerable<User>> GetUsersAsync() {
            return await _context.Users.Include(u => u.Roles).ToListAsync();
        }
    }
}
