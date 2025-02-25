using System.ComponentModel.DataAnnotations;

namespace StudentManagementInterRapidisimo.Domain.Entities
{
    public class Student
    {
        public int Id { get; set; }
        [Required(ErrorMessage ="el nombre es requerido")]
        [MaxLength(100,ErrorMessage ="el nombre no puede tener mas de 100 caracteres")]
        public string Name { get; set; }
        [Required(ErrorMessage = "el correo es requerido")]
        [EmailAddress(ErrorMessage = "formato de correo no valido")]
        public string Email { get; set; }
        public List<SubjectSelection> SubjectSelection { get; set; } = new List<SubjectSelection>();
    }
}
