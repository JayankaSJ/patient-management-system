using Microsoft.EntityFrameworkCore;
using PatientsApi.Models;
using System.Reflection;

namespace PatientsApi.Data {
    public class ApplicationDbContext : DbContext {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<UserRole> UserRoles { get; set; }
        public DbSet<RolePermission> RolePermissions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            // Configure relationships and constraints


            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());


            // Add some initial data for Roles
            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "Admin" },
                new Role { Id = 2, Name = "ReadOnly" }
            );

            // Add some initial data for Permissions
            modelBuilder.Entity<Permission>().HasData(
                new Permission { Id = 1, Name = "patient:create" },
                new Permission { Id = 2, Name = "patient:update" },
                new Permission { Id = 3, Name = "patient:delete" },
                new Permission { Id = 4, Name = "patient:read" }
            );

            // Add some initial data for Users
            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Username = "admin", PasswordHash = BCrypt.Net.BCrypt.HashPassword("password") },
                new User { Id = 2, Username = "user", PasswordHash = BCrypt.Net.BCrypt.HashPassword("password") }
            );

            // Add initial UserRole relationships
            modelBuilder.Entity<UserRole>().HasData(
                new UserRole { UserId = 1, RoleId = 1 },  // Admin role for admin user
                new UserRole { UserId = 2, RoleId = 2 }  // Manager role for admin user
            );

            // Add initial RolePermission relationships
            modelBuilder.Entity<RolePermission>().HasData(
                new RolePermission { RoleId = 1, PermissionId = 1 },  // Admin has "patient:create"
                new RolePermission { RoleId = 1, PermissionId = 2 },  // Admin has "patient:update"
                new RolePermission { RoleId = 1, PermissionId = 3 },  // Admin has "patient:delete"
                new RolePermission { RoleId = 1, PermissionId = 4 },  // Admin has "patient:read"

                new RolePermission { RoleId = 2, PermissionId = 4 }  // Manager has "patient:read"

            );

            // Add initial Patients for testing
            modelBuilder.Entity<Patient>().HasData(
                new Patient { Id = 1, FirstName = "John", LastName = "Doe", Email = "john.doe@example.com", PhoneNumber = "1234567890", DateOfBirth = new DateTime(1985, 5, 1) },
                new Patient { Id = 2, FirstName = "Jane", LastName = "Doe", Email = "jane.doe@example.com", PhoneNumber = "1234567891", DateOfBirth = new DateTime(1990, 7, 15) },
                new Patient { Id = 3, FirstName = "Alex", LastName = "Smith", Email = "alex.smith@example.com", PhoneNumber = "1234567892", DateOfBirth = new DateTime(2000, 3, 25) }
            );

        }
    }
}
