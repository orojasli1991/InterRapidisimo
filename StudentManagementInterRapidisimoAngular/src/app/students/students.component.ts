import { Component,OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students',
  imports: [CommonModule, FormsModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss'
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  newStudent: any = { name: '', email: null };
  editingStudent: any = null;
  selectedStudent: any = {}; 
  selectedCourses: number[] = [];
  errorMessage: string = '';
  courses: any[] = []; 
  loggedInUserId: number | null = null; 
  studentId: number = 10; 
  subjectId: number = 7; 


  constructor(private studentService: StudentService,private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
    this.loadjwt();
    this.getStudentsBysubjetc();//temporal debe ir en otro componente solo para probar
  }
  getStudentsBysubjetc():void {
    this.studentService.getStudentsBysubjetc(this.studentId, this.subjectId).subscribe({
      next: (data) => {
        var temp  = data;
        console.log(temp)
      },
      error: (err) => {
        console.error('Error al cargar compañeros:', err);
      }
    });
  }

  loadjwt()
  {
    const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      this.loggedInUserId = Number(decodedToken.userId);
    } catch (error) {
      console.error('Error al decodificar el token:', error);
    }
  }else{
    this.router.navigate(['/login']);    
  }

  }
  toggleCourse(courseId: number, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
  
    if (checked) {
      if (this.selectedCourses.length < 3) {
        this.selectedCourses.push(courseId);
      } else {
        alert("Solo puedes seleccionar 3 cursos.");
        (event.target as HTMLInputElement).checked = false;
      }
    } else {
      this.selectedCourses = this.selectedCourses.filter(id => id !== courseId);
    }
  }
  loadStudents(): void {
    this.studentService.getStudents().subscribe(
      (data: any[]) => {
        // Transformar propiedades a camelCase
        this.students = data.map(subject => ({
          Id: subject.Id,
          Name: subject.Name,
          Credits: subject.Credits,
          Email: subject.Email
        }));
        console.log(this.students);
      },
      (error) => {
        console.error('Error loading subjects:', error);
      }
    );
  }

  addStudent(): void {
    console.log('addStudent');
    this.studentService.createStudent(this.newStudent).subscribe(() => {
      this.loadStudents();
      this.newStudent = { name: '', age: null };
    });
  }
  deleteStudent(id: number): void {
    if (confirm('¿Estás seguro de eliminar este estudiante?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
      });
    }
  }

editStudent(student: any): void {
  if (!student || !student.Id) {
    console.error('Estudiante no válido para editar');
    return;
  }
  console.log('Estudiante seleccionado para editar:', student);
  this.selectedStudent = { ...student }; // Clonar el objeto para editar
}

updateStudent(): void {
  if (!this.selectedStudent.Id) {
    console.error('ID del estudiante no encontrado');
    return;
  }

  console.log('Datos enviados al backend:', this.selectedStudent);
  const formattedStudent = {
    Id: this.selectedStudent.Id,
    Name: this.selectedStudent.Name,
    Email: this.selectedStudent.Email
  };
  this.studentService.updateStudent(this.selectedStudent.Id, formattedStudent)
    .subscribe(
      response => {
        console.log('Estudiante actualizado con éxito:', response);
        this.loadStudents(); 
        this.selectedStudent = {}; 
      },
      error => {
        console.error('Error al actualizar estudiante:', error);
      }
    );
}


}

