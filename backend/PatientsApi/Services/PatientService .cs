using PatientsApi.Models;
using PatientsApi.Repositories;

namespace PatientsApi.Services {
    public class PatientService : IPatientService {
        private readonly IPatientRepository _patientRepository;

        public PatientService(IPatientRepository patientRepository) {
            _patientRepository = patientRepository;
        }

        public async Task<Patient> GetPatientByIdAsync(int id) {
            return await _patientRepository.GetPatientByIdAsync(id);
        }

        public async Task<IEnumerable<Patient>> GetAllPatientsAsync() {
            return await _patientRepository.GetAllPatientsAsync();
        }

        public async Task<Patient> AddPatientAsync(Patient patient) {
            return await _patientRepository.AddPatientAsync(patient);
        }

        public async Task<Patient> UpdatePatientAsync(Patient patient) {
            return await _patientRepository.UpdatePatientAsync(patient);
        }

        public async Task DeletePatientAsync(int id) {
            await _patientRepository.DeletePatientAsync(id);
        }
    }
}

