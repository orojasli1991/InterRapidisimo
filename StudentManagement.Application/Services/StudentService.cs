
using StudentManagementInterRapidisimo.Domain.Entities;
using StudentManagementInterRapidisimo.Domain.Interfaces;
using AutoMapper;
using StudentManagementInterRapidisimo.Application.Interfaces;
using StudentManagementInterRapidisimo.Application.Dto;
using StudentManagementInterRapidisimo.Dao.Repositories;
using Microsoft.EntityFrameworkCore;

namespace StudentManagementInterRapidisimo.Application.Services
{
    public class StudentService : IStudentService
    {
        private readonly IStudentRepository _repository;
        private readonly IMapper _mapper;

        public StudentService(IStudentRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<StudentDto>> GetAllAsync()
        {
            var students = await _repository.GetAllAsync();
            return _mapper.Map<IEnumerable<StudentDto>>(students);
        }

        public async Task<StudentDto?> GetByIdAsync(int id)
        {
            var student = await _repository.GetByIdAsync(id);
            return _mapper.Map<StudentDto>(student);
        }

        public async Task AddAsync(StudentDto studentDto)
        {
            var student = _mapper.Map<Student>(studentDto);
            await _repository.AddAsync(student);
        }

        public async Task UpdateAsync(StudentDto studentDto)
        {
            var student = _mapper.Map<Student>(studentDto);
            await _repository.UpdateAsync(student);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
       
    }
}

