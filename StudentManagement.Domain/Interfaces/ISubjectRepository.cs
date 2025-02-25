using StudentManagementInterRapidisimo.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentManagementInterRapidisimo.Domain.Interfaces
{
    public interface ISubjectRepository
    {
        Task<List<Subject>> GetAllAsync();
        Task<Subject> GetByIdAsync(int id);
        Task AddAsync(Subject subject);
        Task UpdateAsync(Subject subject);
        Task DeleteAsync(int id);
        Task SaveSelectionAsync(IEnumerable<SubjectSelection> selectedSubjects);
        IEnumerable<object> GetStudentsBysubjetc(int studentId, List<int> subjectIds);
        IEnumerable<object> GetSubjectsByStudent(int studentId);
    }
}