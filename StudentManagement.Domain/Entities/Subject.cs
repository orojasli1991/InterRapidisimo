using StudentManagementInterRapidisimo.Domain.Entities.StudentManagementInterRapidisimo.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentManagementInterRapidisimo.Domain.Entities
{
    public class Subject
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "el nombre es requerido")]
        [MaxLength(100, ErrorMessage = "el nombre no puede tener mas de 100 caracteres")]
        public string Name { get; set; } = string.Empty;
        [Range(3, 3, ErrorMessage = "Cada materia debe tener 3 créditos.")]
        public int Credits { get; set; } = 3;
        public int TeacherId { get; set; }
        public Teacher Teacher { get; set; }

    }
}
