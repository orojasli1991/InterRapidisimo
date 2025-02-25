import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse  } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5203/api/Student'; 
  private headers = { 'Content-Type': 'application/json' };
  constructor(private http: HttpClient) {}
  
  
  getStudentsBysubjetc(studentId: number, subjectId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${studentId}/GetStudentsBySubject/${subjectId}`);{
  }
}
  enroll(studentId: number, courseIds: number[]): Observable<any> {
    const url = `${this.apiUrl}/${studentId}/enroll`;
    return this.http.post(url, { courseIds });
  }
  getStudents(): Observable<any[]> {
    console.log('Lanzando petición GET a:', this.apiUrl);
    return this.http.get<any[]>(`${this.apiUrl}/GetAllStudent`);
  }


  getStudentById(id: number): Observable<any> {
    console.log('Lanzando petición  a:', this.apiUrl);
    return this.http.get<any>(`${this.apiUrl}/GetAllStudent/${id}`);
  }


  createStudent(student: any): Observable<any> {
    console.log('Lanzando petición  a:', this.apiUrl);
    return this.http.post<any>(`${this.apiUrl}/Create`, student);
  }


  updateStudent(id: number, student: any): Observable<any> {
    console.log('Lanzando petición a:', this.apiUrl);
    console.log('Datos enviados al backend:', student );
  
    const headers = { 'Content-Type': 'application/json' };
  
    return this.http.put<any>(`${this.apiUrl}/UpdateStudent/${id}`, student, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al actualizar estudiante:', error);
  
        if (error.status === 400) {
          console.warn('⚠️ Error 400 - Bad Request');
  
          if (error.error?.errors) {
            console.log('Detalles de validación:', error.error.errors);
  
            // Iterar los errores y mostrarlos más claros
            for (const key in error.error.errors) {
              if (error.error.errors.hasOwnProperty(key)) {
                console.warn(`🔸 ${key}: ${error.error.errors[key].join(', ')}`);
              }
            }
          } else {
            console.warn('Sin detalles específicos de validación.');
          }
        } else if (error.status === 404) {
          console.warn('⚠️ Error 404 - Estudiante no encontrado');
        } else {
          console.warn(`⚠️ Error inesperado (${error.status}): ${error.message}`);
        }
  
        return throwError(() => new Error('Error al actualizar estudiante.'));
      })
    );
  }
  
  

  deleteStudent(id: number): Observable<any> {
    console.log('Lanzando petición  a:', this.apiUrl);
    const headers = { 'Content-Type': 'application/json' };
    return this.http.delete<any>(`${this.apiUrl}/DeleteStudent/${id}`);
  }
}
