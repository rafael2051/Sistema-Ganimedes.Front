import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { FormMetaData, Formulario } from '../../models/formulario.model';

@Component({
  selector: 'app-lista-formularios',
  standalone: true,
  imports: [MatIconModule, MatTableModule],
  templateUrl: './lista-formularios.component.html',
  styleUrl: './lista-formularios.component.css',
})
export class ListaFormulariosComponent {
  displayedColumns: string[] = ['referencia', 'aluno', 'parecer dado?'];

  formularios: FormMetaData[] = [];

  constructor(private router: Router) {}

  redirecionaAluno(nusp_aluno: string) {
    this.router.navigate([`/formulario/${nusp_aluno}`]);
  }
}
