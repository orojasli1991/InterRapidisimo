import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:5203/api/subject'; 

  constructor(private http: HttpClient) {}

  getSubjects(): Observable<any[]> {
    console.log("getSubjects");
    return this.http.get<any[]>(`${this.apiUrl}/GetAllSubject`);
  }

 saveSelection(subjects:any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/saveSelection`, subjects, {headers});
  }
  getStudentsBysubjetc(studentId: number, subjectIds: number[]) {
    return this.http.post<any[]>(`${this.apiUrl}/${studentId}/GetStudentsBySubjects`, subjectIds);
  }
  getSubjectsByStudent(studentId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/${studentId}/GetSubjectsByStudent`);
  }
}
