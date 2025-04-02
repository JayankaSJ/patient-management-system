using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace PatientsApi.Models {
    public class Permission {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Role>? Roles { get; set; }
    }

    public class PermissionConfiguration : IEntityTypeConfiguration<Permission> {
        public void Configure(EntityTypeBuilder<Permission> builder) {
            builder.ToTable("Permissions");
            builder.Property(r => r.Name).HasMaxLength(100).IsRequired();
            builder.HasMany<Role>(r => r.Roles)
                .WithMany()
                .UsingEntity<RolePermission>();
        }
    }
}

