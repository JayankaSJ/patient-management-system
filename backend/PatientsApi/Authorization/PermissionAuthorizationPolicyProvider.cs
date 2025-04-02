using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Options;

namespace PatientsApi.Authorization {
    public class PermissionAuthorizationPolicyProvider : DefaultAuthorizationPolicyProvider {
        public PermissionAuthorizationPolicyProvider(IOptions<AuthorizationOptions> options)
            : base(options) { }

        public override async Task<AuthorizationPolicy?> GetPolicyAsync(string policyName) {
            var policy = await base.GetPolicyAsync(policyName);

            if (policy is not null) {
                return policy;
            }

            var permissions = policyName.Split(',');

            return new AuthorizationPolicyBuilder()
                .AddRequirements(new PermissionsRequirement(permissions))
                .Build();
        }
    }
}
