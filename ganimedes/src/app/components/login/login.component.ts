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

  salvarTokenSimbolico() {
    const aluno_teste = new Aluno(
      'Alexandre de Moraes (xandão)',
      '283024',
      'xandao@usp.br',
      'http://lattes.cnpq.br/2083768829536427',
      'ALUNO',
      'Doutorado',
      2025,
      'Aprovado',
      'Não Realizado',
      new Date(2025, 11, 31),
      new Date(2028, 11, 31),
      'Alexandre Ferreira Ramos',
      '112223334',
      new Date(1968, 11, 13),
      'Brasileiro'
    );

    const docente_teste = new Docente(
      'Alexandre Ferreira Ramos (xandão)',
      '3764294',
      'alex.ramos@usp.br',
      'http://lattes.cnpq.br/1216871665198656',
      'CCP'
    );

    this.authService.setToken('token_simbolico');
    sessionStorage.setItem(
      'expiration_date',
      '2024-12-15T01:29:24.4417538-03:00'
    );
    sessionStorage.setItem('perfil', 'ALUNO'); //Defina como "ALUNO" ou "DOCENTE" ou "CCP"
    sessionStorage.setItem('usuario', JSON.stringify(aluno_teste));
  }

  salvarDados(dadosUsuario: LoginResponse) {
    this.authService.setToken(dadosUsuario.token);
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

        this.salvarTokenSimbolico();
        this.router.navigate(['/']);
      },
    });
  }

  signUp() {
    this.router.navigate(['/cadastro']);
  }
}
