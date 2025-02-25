import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../services/subject.service'; // Asegúrate de crear un servicio para manejar las materias
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {jwtDecode} from 'jwt-decode';

interface Subject {
  id: number;
  name: string;
  teacherId: number; // Asegúrate de que el Subject tenga este campo para que la validación del profesor funcione
  credits:number;
}

@Component({
  selector: 'app-subjects-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subjects-selection.component.html',
  styleUrls: ['./subjects-selection.component.css']
})
export class SubjectsSelectionComponent implements OnInit {
  subjects: Subject[] = []; 
  selectedSubjects: Subject[] = []; 
  errorMessage = ''; 
  loggedInUserId: number | null = null; 


  constructor(private subjectService: SubjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadSubjects();
    this.loadjwt();
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
  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe(
      (data: any[]) => {
        // Transformar propiedades a camelCase
        this.subjects = data.map(subject => ({
          id: subject.Id,
          name: subject.Name,
          credits: subject.Credits,
          teacherId: subject.TeacherId,
          teacher: subject.Teacher
        }));
        console.log(this.subjects);
      },
      (error) => {
        console.error('Error loading subjects:', error);
      }
    );
  }
  
  onSubjectSelect(subject: any) {
    if (subject.selected) {
      if (this.selectedSubjects.length < 3) {
        this.selectedSubjects.push(subject);
      } else {
        alert('Solo puedes seleccionar 3 materias.');
        subject.selected = false; // Desmarcar si se intenta seleccionar más de 3
      }
    } else {
      this.selectedSubjects = this.selectedSubjects.filter((s) => s.id !== subject.Id);
    }
    // Verificar que no haya clases con el mismo profesor
    const selectedTeachers = this.selectedSubjects.map(s => s.teacherId);
    if (selectedTeachers.includes(subject.teacherId)) {
      this.errorMessage = 'No puedes seleccionar materias del mismo profesor.';
      return;
    }else {
      // Eliminar la materia si se deselecciona
      this.selectedSubjects = this.selectedSubjects.filter((s) => s.id !== subject.Id);
    }

    this.toggleSubject(subject);
  }

  toggleSubject(subject: Subject): void {
    const index = this.selectedSubjects.indexOf(subject);
    if (index > -1) {
      this.selectedSubjects.splice(index, 1); // Elimina el subject si ya está en el arreglo
    } else {
      this.selectedSubjects.push(subject); // Agrega el subject si no está en el arreglo
    }
  }

  saveSelection(): void {
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
    const selectedSubjects = this.selectedSubjects.map((subject: any) => ({
      studentId: studentId,
      subjectId: subject.id
    }));
    if (this.selectedSubjects.length === 3) {
      this.subjectService.saveSelection(selectedSubjects).subscribe(
        (response: any) => {
          this.router.navigate(['/students']); 
        },
        (error: any) => {
          console.error('Error saving selection:', error);
        }
      );
    } else {
      this.errorMessage = 'Debes seleccionar exactamente 3 materias.';
    }
  }
}
