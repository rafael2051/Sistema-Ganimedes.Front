import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../../models/loginResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7260';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  authStatus$ = this.authStatus.asObservable();
  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
    this.authStatus.next(true);
  }

  removeToken() {
    sessionStorage.removeItem('token');
    this.authStatus.next(false);
  }

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
