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
import { Aluno, Docente } from '../../models/usuario.model';

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
    const dataAtual = new Date();
    const daquiCincoMinutos = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth(),
      dataAtual.getDate(),
      dataAtual.getHours(),
      dataAtual.getMinutes() + 5,
      dataAtual.getSeconds()
    );
    console.log('tempo em 5 minutos', daquiCincoMinutos);

    const aluno_teste = new Aluno(
      'Alexandre de Moraes (xandão)',
      '283024',
      'xandao@usp.br',
      'http://lattes.cnpq.br/2083768829536427',
      'Aluno',
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

    sessionStorage.setItem('token', JSON.stringify(daquiCincoMinutos));
    sessionStorage.setItem('perfil', 'CCP'); //Defina como "Aluno" ou "Docente" ou "CCP"
    sessionStorage.setItem('usuario', JSON.stringify(docente_teste));
  }

  salvarDados(dadosUsuario: any) {
    sessionStorage.setItem('token', dadosUsuario.token);
    sessionStorage.setItem('exp_tolen', dadosUsuario.validade);
    sessionStorage.setItem('perfil', dadosUsuario.perfil);
    sessionStorage.setItem('usuario', JSON.stringify(dadosUsuario));
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
