using Microsoft.EntityFrameworkCore;
using PatientsApi.Data;
using PatientsApi.Models;

namespace PatientsApi.Repositories {
    public class PatientRepository : IPatientRepository {
        private readonly ApplicationDbContext _context;

        public PatientRepository(ApplicationDbContext context) {
            _context = context;
        }

        public async Task<Patient> GetPatientByIdAsync(int id) {
            return await _context.Patients.FindAsync(id);
        }

        public async Task<IEnumerable<Patient>> GetAllPatientsAsync() {
            return await _context.Patients.ToListAsync();
        }

        public async Task<Patient> AddPatientAsync(Patient patient) {
            await _context.Patients.AddAsync(patient);
            await _context.SaveChangesAsync();
            return patient;
        }

        public async Task<Patient> UpdatePatientAsync(Patient patient) {
            _context.Patients.Update(patient);
            await _context.SaveChangesAsync();
            return patient;
        }

        public async Task DeletePatientAsync(int id) {
            var patient = await _context.Patients.FindAsync(id);
            if (patient != null) {
                _context.Patients.Remove(patient);
                await _context.SaveChangesAsync();
            }
        }
    }
}

