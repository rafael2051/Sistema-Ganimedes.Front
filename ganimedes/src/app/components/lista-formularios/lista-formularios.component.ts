import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormMetaData, Formulario } from '../../models/formulario.model';
import { FormularioService } from '../../services/formulario/formulario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-lista-formularios',
  standalone: true,
  imports: [MatIconModule, MatTableModule],
  providers: [FormularioService],
  templateUrl: './lista-formularios.component.html',
  styleUrl: './lista-formularios.component.css',
})
export class ListaFormulariosComponent {
  displayedColumns: string[] = ['referencia', 'aluno', 'parecer dado?'];
  formularios: FormMetaData[] = [];
  nusp_docente = '';

  constructor(private router: Router, private servico: FormularioService) {
    this.setNuspDocente();

    this.servico.listarFormularios(this.nusp_docente).subscribe({
      next: (res) => {
        this.formularios = res;
      },
      error: (err) => console.log('Erro ao buscar formulários', err),
    });
  }

  setNuspDocente() {
    const usuario = sessionStorage.getItem('usuario');
    if (usuario) {
      const usuario_parsed = JSON.parse(usuario) as Usuario;
      this.nusp_docente = usuario_parsed.nusp;
    }
  }

  redirecionaAluno(nusp_aluno: string) {
    this.router.navigate([`/formulario/${nusp_aluno}`]);
  }
}
