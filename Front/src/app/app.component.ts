import { Component, Input } from '@angular/core';
import { Usuario, Aluno } from './models/usuario.model';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/AuthService';
import { AuthGuard } from './utils/AuthGuard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIconModule, RouterModule, HttpClientModule],
  providers: [AuthGuard, AuthService, HttpClient],
  templateUrl: './app.component.html',
})
export class AppComponent {
  textoFormulario: 'Formulário' | 'Formulários Alunos' = 'Formulário';
  usuario: Usuario;

  constructor() {
    this.usuario = new Aluno(
      'Aluno 1',
      '12345678',
      'email@usp.br',
      true,
      'token_teste',
      'https://google.com',
      'aluno', //Mude o perfil aqui para mudar a navbar (Só para testes - o perfil deve vir do backend)
      'Mestrado',
      2022,
      'Aprovado',
      'Aprovado',
      new Date(2023, 10, 9),
      new Date(2025, 10, 9),
      'Marcelo Medeiros Eller',
      '112234456',
      new Date(1999, 11, 31),
      'Brasileiro'
    );

    this.textoFormulario =
      this.usuario.perfil === 'aluno' ? 'Formulário' : 'Formulários Alunos';
  }
}
