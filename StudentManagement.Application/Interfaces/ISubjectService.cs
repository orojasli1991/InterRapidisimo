using StudentManagementInterRapidisimo.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentManagementInterRapidisimo.Application.Interfaces
{
    public interface ISubjectService
    {
        Task<List<Subject>> GetAllSubjects();
        Task SaveSelection(List<SubjectSelection> selectedSubjects);
        IEnumerable<object>GetStudentsBySubject(int studentId, List<int> subjectIds);
        IEnumerable<object> GetSubjectsByStudent(int studentId);
    }
}
