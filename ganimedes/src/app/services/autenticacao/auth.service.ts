import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginResponse } from '../../models/loginResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/login';

  constructor(private http: HttpClient) {}

  login(form: any): Observable<LoginResponse> {
    const formSent = new FormData();
    formSent.append('username', form.email);
    formSent.append('password', form.senha);
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, formSent);
  }

  signUp(form: any): Observable<boolean> {
    console.log('form', form);
    const formSent = new FormData();
    return this.http.post<boolean>(`${this.apiUrl}/cadastro`, formSent);
  }
}
