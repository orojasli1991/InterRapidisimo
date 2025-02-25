
using Microsoft.EntityFrameworkCore;
using StudentManagementInterRapidisimo.Dao.Persitence;
using StudentManagementInterRapidisimo.Domain.Entities;
using StudentManagementInterRapidisimo.Domain.Interfaces;

namespace StudentManagement.Dao
{
    public class SubjectRepository : ISubjectRepository
    {
        private readonly ApplicationDbContext _context;

        public SubjectRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Subject>> GetAllAsync()
        {
            return await _context.Subjects.ToListAsync();

        }

        public async Task<Subject> GetByIdAsync(int id)
        {
            return await _context.Subjects.FindAsync(id);
        }

        public async Task AddAsync(Subject subject)
        {
            _context.Subjects.Add(subject);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Subject subject)
        {
            _context.Subjects.Update(subject);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var subject = await _context.Subjects.FindAsync(id);
            if (subject != null)
            {
                _context.Subjects.Remove(subject);
                await _context.SaveChangesAsync();
            }
        }
        public async Task SaveSelectionAsync(IEnumerable<SubjectSelection> selectedSubjects)
        {
      
            if (selectedSubjects == null || !selectedSubjects.Any())
            {
                throw new ArgumentException("La lista de materias seleccionadas no puede estar vacía.");
            }
            var selectedSubjectsToSave = selectedSubjects.Select(subject => new SubjectSelection
            {
                StudentId = subject.StudentId, 
                SubjectId = subject.SubjectId
            }).ToList();

     
            await _context.SubjectSelections.AddRangeAsync(selectedSubjectsToSave);
            await _context.SaveChangesAsync();
        }
        public IEnumerable<object> GetStudentsBysubjetc(int studentId, List<int> subjectIds)
        {
            return _context.SubjectSelections
                .Where(ss => subjectIds.Contains(ss.SubjectId) && ss.StudentId != studentId)
                .Join(_context.Students,
                    ss => ss.StudentId,
                    s => s.Id,
                    (ss, s) => new { Student = s, ss.SubjectId })
                .Join(_context.Subjects,
                    ss => ss.SubjectId,
                    subj => subj.Id,
                    (ss, subj) => new
                    {
                        Id = ss.Student.Id,
                        Name = ss.Student.Name,
                        SubjectId = subj.Id,
                        SubjectName = subj.Name
                    })
                .Distinct()
                .ToList();
        }
        public IEnumerable<object> GetSubjectsByStudent(int studentId)
        {
            return _context.SubjectSelections
         .Where(ss => ss.StudentId == studentId)
         .Join(_context.Subjects,
             ss => ss.SubjectId,
             subj => subj.Id,
             (ss, subj) => subj) 
         .ToList();

        }
    }

}
