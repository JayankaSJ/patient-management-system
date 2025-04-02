using PatientsApi.Models;

namespace PatientsApi.Repositories {
    public interface IUserRepository {
        Task<User> GetUserByUsernameAsync(string username);
        Task<bool> UserExistsAsync(string username);
        Task<IEnumerable<User>> GetUsersAsync();
    }
}
