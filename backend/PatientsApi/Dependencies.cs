using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection.Extensions;
using PatientsApi.Authorization;
using PatientsApi.Repositories;
using PatientsApi.Services;

namespace PatientsApi {
    public static class Dependencies {

        public static void Initialize(WebApplicationBuilder builder) {

            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IPatientRepository, PatientRepository>();

            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IPatientService, PatientService>();
        }

    }
}
