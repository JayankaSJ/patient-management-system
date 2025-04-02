using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace PatientsApi.Models {
    public class RolePermission {
        public int RoleId { get; set; }
        public int PermissionId { get; set; }
    }

    public class RolePermissionConfiguration : IEntityTypeConfiguration<RolePermission> {
        public void Configure(EntityTypeBuilder<RolePermission> builder) {
            builder.ToTable("RolePermission");
            builder.HasKey(rp => new { rp.RoleId, rp.PermissionId });
        }
    }
}

