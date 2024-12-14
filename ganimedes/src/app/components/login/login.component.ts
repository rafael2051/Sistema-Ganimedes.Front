import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/autenticacao/auth.service';
import { Router } from '@angular/router';
import { Aluno, Docente, Usuario } from '../../models/usuario.model';
import { LoginResponse } from '../../models/loginResponse.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  salvarDados(dadosUsuario: LoginResponse) {
    console.log('wergjbewrg', dadosUsuario.user_data);
    sessionStorage.setItem('token', dadosUsuario.token);
    sessionStorage.setItem(
      'expiration_date',
      `${dadosUsuario.expiration_date}`
    );
    sessionStorage.setItem('perfil', dadosUsuario.user_data.perfil);
    sessionStorage.setItem('usuario', JSON.stringify(dadosUsuario.user_data));
    sessionStorage.setItem(
      'student_data',
      JSON.stringify(dadosUsuario.student_data)
    );
  }

  login() {
    this.authService.login(this.form.value).subscribe({
      next: (response) => {
        this.salvarDados(response);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log('erro login - resposta', error);
        alert('Usuário ou senha inválidos');
      },
    });
  }

  signUp() {
    this.router.navigate(['/cadastro']);
  }
}
