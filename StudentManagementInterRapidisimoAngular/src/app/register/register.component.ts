import { Component } from '@angular/core';
import { StudentService } from '../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  constructor(private studentService: StudentService,private router: Router) {}


  step: number = 1;
  newStudent: any = { name: '', email: null };

  addStudent(): void {
    if (!this.newStudent.name || !this.newStudent.email) {
      alert('Por favor, complete todos los campos.');
      return;
    }
  
    this.studentService.createStudent(this.newStudent).subscribe({
      next: () => {
        console.log('Estudiante registrado correctamente');
        alert('Estudiante registrado correctamente');
        this.newStudent = { name: '', email: null }; 
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar estudiante:', err);
        alert('Ocurrió un error al registrar el estudiante. Intente nuevamente.');
      }
    });
  }


}
