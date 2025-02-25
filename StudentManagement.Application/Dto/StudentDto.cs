using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

   namespace StudentManagementInterRapidisimo.Application.Dto
    {
        public class StudentDto
        {
            public int Id { get; set; }
            [Required]
            public string Name { get; set; }
            [Required]
            public string Email { get; set; } 
            public int Credits { get; set; } 
        }
    }



