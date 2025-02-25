using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace StudentManagementInterRapidisimo.Application.Dto
{
    public class SubjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Credits { get; set; }

        public TeacherDto Teacher { get; set; }
    }
}
