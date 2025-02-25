import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../services/subject.service'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';

@Component({
    selector: 'app-students-class-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './students-class-details.component.html',
    styleUrls: ['./students-class-details.component.css']
  })


export class StudentsClassDetailsComponent implements OnInit {

    constructor(private subjectService: SubjectService, private router: Router) {}
    ngOnInit(): void {
        this.getStudentsBysubject();
        this.loadjwt();
    }

    classmates: any[] = [];
    subjectId: number = 10; 
    loggedInUserId: number | null = null; 

  
    getStudentsBysubject(): void {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token no encontrado');
          return;
        }
      
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const studentId = tokenPayload.userId;
      
        if (!studentId) {
          console.error('ID del estudiante no encontrado en el token');
          return;
        }
        this.subjectService.getSubjectsByStudent(studentId).subscribe({
          next: (subjects) => {
            console.log('Materias del estudiante:', subjects);
      
            const subjectIds = subjects.map((subject: any) => subject.Id);
      
            if (subjectIds.length === 0) {
              console.warn('El estudiante no tiene materias registradas.');
              return;
            }
            this.subjectService.getStudentsBysubjetc(studentId, subjectIds).subscribe({
              next: (data) => {
                this.classmates = data;
                console.log('Compañeros cargados:', this.classmates);
              },
              error: (err) => {
                console.error('Error al cargar compañeros:', err);
              }
            });
          },
          error: (err) => {
            console.error('Error al cargar materias del estudiante:', err);
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
}
