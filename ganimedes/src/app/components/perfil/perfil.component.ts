import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-perfil",
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    provideNativeDateAdapter(),
  ],
  imports: [
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMomentDateModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  templateUrl: "./perfil.component.html",
  styleUrl: "./perfil.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PerfilComponent {
  public formPerfil: FormGroup;
  public edicaoDesabilitada = false;

  public perfil = sessionStorage.getItem("perfil");
  public curso = "";

  public orientadores = [
    "Alexandre Ferreira Ramos",
    "Ana Amélia Benedito Silva",
    "André Carlos Busanelli de Aquino",
    "Andre Cavalcanti Rocha Martins",
    "Ariane Machado Lima",
    "Camilo Rodrigues Neto",
    "Cláudia Inés Garcia",
    "Clodoaldo Aparecido de Moraes Lima",
    "Daniel de Angelis Cordeiro",
    "Edmir Parada Vasques Prado",
    "Esteban Fernandez Tuesta",
    "Fabio Nakano",
    "Fátima de Lourdes dos Santos Nunes Marques",
    "Fernando Auil",
    "Flávio Luiz Coutinho",
    "Gisele da Silva Craveiro",
    "Helton Hideraldo Bíscaro",
    "Ivandré Paraboni",
    "João Luiz Bernardes Júnior",
    "José de Jesús Pérez Alcázar",
    "José Ricardo Gonçalves de Mendonça",
    "Karina Valdivia Delgado",
    "Karla Roberta Pereira Sampaio Lima",
    "Luciane Meneguin Ortega",
    "Luciano Antonio Digiampietri",
    "Luciano Vieira de Araújo",
    "Marcelo de Souza Lauretto",
    "Marcelo Fantinato",
    "Marcelo Medeiros Eler",
    "Marcelo Morandini",
    "Marcio Moretto Ribeiro",
    "Marcos Lordello Chaim",
    "Masayuki Oka Hase",
    "Norton Trevisan Roman",
    "Patrícia Rufino Oliveira",
    "Renan Cerqueira Afonso Alves",
    "Regis Rossi Alves Faria",
    "Sarajane Marques Peres",
    "Valdinei Freire da Silva",
    "Violeta Sun",
  ];

  public anosDeIngresso: Number[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.formPerfil = this.fb.group({
      email: [
        { value: "", disabled: false },
        [Validators.required, Validators.email],
      ],
      linkLattes: [{ value: "", disabled: false }, Validators.required],
      dtLattes: [{ value: "", disabled: false }, Validators.required],
      curso: [
        { value: "", disabled: this.desabilitaSeNaoAluno() },
        Validators.required,
      ],
      anoIngresso: [
        { value: 0, disabled: this.desabilitaSeNaoAluno() },
        Validators.required,
      ],
      exameProficiencia: [
        { value: "", disabled: this.desabilitaSeNaoAluno() },
        Validators.required,
      ],
      exameQualificacao: [
        { value: "", disabled: this.desabilitaSeNaoAluno() },
        Validators.required,
      ],
      prazoQualificacao: [
        { value: "", disabled: this.desabilitaSeNaoAluno() },
        Validators.required,
      ],
      prazoTese: [
        { value: "", disabled: this.desabilitaSeNaoAluno() },
        Validators.required,
      ],
      orientador: [
        { value: "", disabled: this.desabilitaSeNaoAluno() },
        Validators.required,
      ],
    });

    this.defineAnosDeIngresso();
    this.buscarDadosUsuario();
  }

  public salvarPerfil() {
    console.log("salvando o perfil");
    // for (let i of [
    //   "email",
    //   "linkLattes",
    //   "dtLattes",
    //   "curso",
    //   "anoIngresso",
    //   "exameProficiencia",
    //   "exameQualificacao",
    //   "prazoQualificacao",
    //   "prazoTese",
    //   "orientador",
    // ]) {
    //   console.log(
    //     `Controle: ${i} - Valor: ${this.formPerfil.controls[i].value} - Válido: ${this.formPerfil.controls[i].valid}`,
    //   );
    // }

    // this.service.salvarPerfil(this.formPerfil.value);
  }

  defineAnosDeIngresso() {
    const anoAtual = new Date().getFullYear();
    for (let i = anoAtual; i >= anoAtual - 8; i--) {
      this.anosDeIngresso.push(i);
    }
  }

  buscarDadosUsuario() {
    // this.service.buscarPerfil(this.formPerfil.value);
  }

  desabilitaSeNaoAluno(): boolean {
    return this.perfil !== "Aluno";
  }

  // TODO: modficar para redirecionar para o formulário correto, de acordo com o nusp
  redirecionarFormulario() {
    this.router.navigate([`/formulario/13123`]);
  }
}
