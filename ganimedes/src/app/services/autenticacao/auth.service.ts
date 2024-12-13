import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/loginResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7260';

  constructor(private http: HttpClient) {}

  login(form: any): Observable<any> {
    const formSent = {
      username: form.email,
      password: form.senha,
    };
    return this.http.post<any>(`${this.apiUrl}/login`, formSent);
  }

  signUpUser(form: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registerUser`, form);
  }

  signUpStudent(form: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/registerStudent`, form);
  }
}
