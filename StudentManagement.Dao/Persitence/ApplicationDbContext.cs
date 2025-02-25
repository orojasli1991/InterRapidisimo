using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using StudentManagementInterRapidisimo.Domain.Entities;
using StudentManagementInterRapidisimo.Domain.Entities.StudentManagementInterRapidisimo.Domain.Entities;

namespace StudentManagementInterRapidisimo.Dao.Persitence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teacher { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<SubjectSelection> SubjectSelections { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Teacher>()
        .HasMany(t => t.Subjects)
        .WithOne(s => s.Teacher)
        .HasForeignKey(s => s.TeacherId);


            modelBuilder.Entity<SubjectSelection>()
        .HasKey(ss => new { ss.StudentId, ss.SubjectId });



            modelBuilder.Entity<SubjectSelection>()
               .HasKey(ss => new { ss.StudentId, ss.SubjectId }); // Llave compuesta

     


            base.OnModelCreating(modelBuilder);
        }


    }
}
