import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { Formulario } from "../../models/formulario.model";

@Component({
  selector: "app-lista-formularios",
  standalone: true,
  imports: [MatIconModule, MatTableModule],
  templateUrl: "./lista-formularios.component.html",
  styleUrl: "./lista-formularios.component.css",
})
export class ListaFormulariosComponent {
  // TODO: Reformular lista para ser em tabela

  displayedColumns: string[] = [
    "referencia",
    "aluno",
    "orientador",
    "parecer docente dado?",
    "parecer ccp dado?",
  ];

  formularios: Formulario[] = [
    new Formulario(
      "form1",
      "abr./2024",
      "123456",
      "João Silva",
      "Dr. Silva",
      2,
      1,
      1,
      "Participação em seminários",
      "Pesquisa sobre IA",
      "Declaração de CCP",
      "Falta de recursos",
      "Conceitos de Machine Learning",
      "Aprovado",
      "Aprovado",
      "Bom desempenho",
      "Aprovado com louvor",
    ),
    new Formulario(
      "form2",
      "abr./2024",
      "654321",
      "Maria Souza",
      "Dra. Souza",
      3,
      2,
      2,
      "Monitoria em disciplinas",
      "Pesquisa sobre Big Data",
      "Declaração de CCP",
      "Dificuldade em acesso a dados",
      "Conceitos de Big Data",
      "Aprovado com ressalvas",
      "Aprovado",
      "Necessita melhorar em alguns pontos",
      "Aprovado com ressalvas",
    ),
    new Formulario(
      "form3",
      "abr./2024",
      "112233",
      "Carlos Pereira",
      "Dr. Pereira",
      1,
      0,
      0,
      "Participação em congressos",
      "Pesquisa sobre Redes Neurais",
      "Declaração de CCP",
      "Problemas técnicos",
      "Conceitos de Redes Neurais",
      "Insatisfatório",
      "Insatisfatório",
      "Desempenho abaixo do esperado",
      "Reprovado",
    ),
  ];

  constructor(private router: Router) {}

  redirecionaAluno(aluno: Formulario) {
    this.router.navigate([`/formulario/${aluno.nusp_aluno}`]);
  }
}
