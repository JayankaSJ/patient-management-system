using PatientsApi.Models;

namespace PatientsApi.Services {
    public interface IUserService {
        public Task<JwtTokenResponse> LoginUserAsync(string username, string password);

    }
}
