import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/loginResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  login(form: any): Observable<LoginResponse> {
    const formSent = {
      username: form.email,
      password: form.senha,
    };
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, formSent);
  }

  signUpUser(form: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/registerUser`, form);
  }

  signUpStudent(form: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/registerStudent`, form);
  }
}
