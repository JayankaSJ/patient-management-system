using Microsoft.AspNetCore.Authorization;

namespace PatientsApi.Authorization {
    public class PermissionsRequirement : IAuthorizationRequirement {
        public string[] Permissions { get; }

        public PermissionsRequirement(params string[] permissions)  
        {
            Permissions = permissions;
        }
    }
}
