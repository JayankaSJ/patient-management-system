using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace PatientsApi.Models {
    public class Role {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Permission> Permissions { get; set; } = default!;
        public ICollection<User> Users { get; set; } = default!;
    }

    public class RoleConfiguration : IEntityTypeConfiguration<Role> {
        public void Configure(EntityTypeBuilder<Role> builder) {
            builder.ToTable("Roles");
            builder.Property(r => r.Name).HasMaxLength(100).IsRequired();
            builder.HasMany<Permission>(r => r.Permissions)
                .WithMany()
                .UsingEntity<RolePermission>();
            builder.HasMany<User>(r => r.Users)
                .WithMany(u => u.Roles)
                .UsingEntity<UserRole>();
        }
    }
}

