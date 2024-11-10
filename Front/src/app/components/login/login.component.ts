import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/AuthService';
import { Router } from 'express';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.getUsuario(this.credentials).subscribe((response: any) => {
      const { token, usuario } = response;
      sessionStorage.setItem('token', token);
      // this.router.navigate(['/formulario'], { state: { usuario } });
    });
  }
}
