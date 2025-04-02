using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;

namespace PatientsApi.Models {
    public class UserRole {
        public int UserId { get; set; }
        public int RoleId { get; set; }
    }

    public class UserRoleConfiguration : IEntityTypeConfiguration<UserRole> {
        public void Configure(EntityTypeBuilder<UserRole> builder) {
            builder.ToTable("UserRoles");
            builder.HasKey(ur => new { ur.UserId, ur.RoleId });
        }
    }
}

