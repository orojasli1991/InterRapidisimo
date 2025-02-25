using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using StudentManagementInterRapidisimo.Application.Dto;
using StudentManagementInterRapidisimo.Domain.Entities;

namespace StudentManagementInterRapidisimo.Application.Interfaces
{
    public interface IStudentService
    {
        Task<IEnumerable<StudentDto>> GetAllAsync();
        Task<StudentDto?> GetByIdAsync(int id);
        Task AddAsync(StudentDto studentDto);
        Task UpdateAsync(StudentDto studentDto);
        Task DeleteAsync(int id);
       
    }
}
