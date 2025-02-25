import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5203/api/auth';
  constructor(private http: HttpClient) {}

  login(credentials: { username: string}): Observable<any> {
    const body = {
        Username: credentials.username
      };
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<any>(`${this.apiUrl}/login`,body,{headers}).pipe(
      tap(response => localStorage.setItem('token', response.token))
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}
