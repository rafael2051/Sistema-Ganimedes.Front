import { ChangeDetectorRef, Component } from '@angular/core';
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
  token: string | null = null;
  perfil: string | null = null;
  usuario: string | null = null;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.authStatus$.subscribe((status) => {
      this.token = sessionStorage.getItem('token');
      this.perfil = sessionStorage.getItem('perfil');
      this.usuario = sessionStorage.getItem('usuario');
    });
  }

  redirecionaAluno() {
    const usuario = sessionStorage.getItem('usuario');
    let nusp = '';

    if (usuario) {
      nusp = JSON.parse(usuario).nusp;
      this.router.navigate([`formulario/${nusp}`]);
    }
  }

  deslogarUsuario() {
    this.authService.removeToken();
    sessionStorage.removeItem('expiration_date');
    sessionStorage.removeItem('perfil');
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('student_data');
    this.router.navigate(['login']);
  }
}
