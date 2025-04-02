using Microsoft.AspNetCore.Authorization;

namespace PatientsApi.Attributes {
    [AttributeUsage(AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class PermissionsAttribute : AuthorizeAttribute {
        public string[] Permissions { get; }

        public PermissionsAttribute(params string[] permissions)  : base(policy: string.Join(",", permissions.Select(p => p.ToString())))
        {
            Permissions = permissions;
        }
    }
}
