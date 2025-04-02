using PatientsApi.Models;

namespace PatientsApi.Repositories {
    public interface IPatientRepository {
        Task<Patient> GetPatientByIdAsync(int id);
        Task<IEnumerable<Patient>> GetAllPatientsAsync();
        Task<Patient> AddPatientAsync(Patient patient);
        Task<Patient> UpdatePatientAsync(Patient patient);
        Task DeletePatientAsync(int id);
    }
}
