import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/autenticacao/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIconModule, RouterModule, HttpClientModule],
  providers: [AuthService, HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ganimedes';
  token = sessionStorage.getItem('token');
  perfil = sessionStorage.getItem('perfil');
  usuario = sessionStorage.getItem('usuario');

  constructor(private router: Router) {}

  redirecionaAluno() {
    const usuario = sessionStorage.getItem('usuario');
    let nusp = '';

    if (usuario) {
      nusp = JSON.parse(usuario).nusp;
      this.router.navigate([`formulario/${nusp}`]);
    }
  }

  deslogarUsuario() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('perfil');
    sessionStorage.removeItem('usuario');
    this.router.navigate(['login']);
  }
}
