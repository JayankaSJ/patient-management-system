using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json;
using System.Security.Claims;

namespace PatientsApi.Authorization {
    public class PermissionsHandler : AuthorizationHandler<PermissionsRequirement> {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public PermissionsHandler(IHttpContextAccessor httpContextAccessor) {
            _httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, PermissionsRequirement requirement) {
            var user = context.User;
            if (user == null || !user.Identity.IsAuthenticated) {
                context.Fail();
                return Task.CompletedTask;
            }

            bool isAuthorized = CheckUserPermissions(user, requirement.Permissions);
            if (isAuthorized) {
                context.Succeed(requirement);
            }
            else {
                context.Fail();
            }

            return Task.CompletedTask;
        }

        private bool CheckUserPermissions(ClaimsPrincipal user, string[] permissions) {
            var userPermisssions = user.Claims.Where(c => c.Type == "permissions").Select(p => p.Value).ToList();
            return permissions.Any(permission => userPermisssions.Any(c => c == permission));
        }


    }

}
