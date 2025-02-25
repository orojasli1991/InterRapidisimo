using StudentManagement.Dao;
using StudentManagementInterRapidisimo.Application.Interfaces;
using StudentManagementInterRapidisimo.Domain.Entities;
using StudentManagementInterRapidisimo.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace StudentManagementInterRapidisimo.Application.Services
{
    public class SubjectService : ISubjectService
    {
        private readonly ISubjectRepository _subjectRepository;

        public SubjectService(ISubjectRepository subjectRepository)
        {
            _subjectRepository = subjectRepository;
        }

        public async Task<List<Subject>> GetAllSubjects()
        {

            return await _subjectRepository.GetAllAsync();
        }

        public async Task SaveSelection(List<SubjectSelection> selectedSubjects)
        {
            await _subjectRepository.SaveSelectionAsync(selectedSubjects);
        }

        public IEnumerable<object> GetStudentsBySubject(int studentId, List<int> subjectIds)
        {
            return _subjectRepository.GetStudentsBysubjetc(studentId, subjectIds);
        }
        public IEnumerable<object> GetSubjectsByStudent(int studentId)
        {
            return _subjectRepository.GetSubjectsByStudent(studentId);
        }
    }
}
