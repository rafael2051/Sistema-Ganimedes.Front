import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_ASYNC_VALIDATORS,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { RouterModule } from "@angular/router";
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from "@angular/material/core";

@Component({
  selector: "app-cadastro",
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
  templateUrl: "./cadastro.component.html",
  styleUrl: "./cadastro.component.css",
})
export class CadastroComponent {
  form: FormGroup;

  perfis = ["Aluno", "Docente", "CCP"];
  anosDeIngresso: Number[] = [];
  orientadores = [
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
  readonly hoje = new Date();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      /* Podem ser alterados no perfil */
      email: ["", [Validators.required, Validators.email]], //Toddos
      linkLattes: ["", Validators.required], // Todos
      dtLattes: ["", Validators.required], // Todos
      curso: "", // Aluno
      anoIngresso: 0, //Aluno
      exameQualificacao: "", //Aluno
      exameProficiencia: "", //Aluno
      prazoQualificacao: "", //Aluno
      prazoTese: "", //Aluno
      orientador: "", //Aluno

      /* Preenchidos apenas no cadastro*/
      perfil: ["", Validators.required], //Todos
      nome: ["", Validators.required], //Todos
      nusp: ["", Validators.required], //Todos
      rg: "", //Aluno
      dtNascimento: "", //Aluno
      nacionalidade: "", //Aluno
    });

    const anoAtual = new Date().getFullYear();
    for (let i = anoAtual; i >= anoAtual - 8; i--) this.anosDeIngresso.push(i);
  }

  resetCamposAluno() {
    this.form.controls["curso"].reset();
    this.form.controls["anoIngresso"].reset();
    this.form.controls["exameQualificacao"].reset();
    this.form.controls["exameProficiencia"].reset();
    this.form.controls["prazoQualificacao"].reset();
    this.form.controls["prazoTese"].reset();
    this.form.controls["orientador"].reset();
    this.form.controls["rg"].reset();
    this.form.controls["dtNascimento"].reset();
    this.form.controls["nacionalidade"].reset();
  }

  setValidatorsCamposAluno() {
    this.form.controls["curso"].setValidators(Validators.required);
    this.form.controls["anoIngresso"].setValidators(Validators.required);
    this.form.controls["exameQualificacao"].setValidators(Validators.required);
    this.form.controls["exameProficiencia"].setValidators(Validators.required);
    this.form.controls["prazoQualificacao"].setValidators(Validators.required);
    this.form.controls["prazoTese"].setValidators(Validators.required);
    this.form.controls["orientador"].setValidators(Validators.required);
    this.form.controls["rg"].setValidators(Validators.required);
    this.form.controls["dtNascimento"].setValidators(Validators.required);
    this.form.controls["nacionalidade"].setValidators(Validators.required);
  }

  removeValidatorsCamposAluno() {
    this.form.controls["curso"].clearValidators();
    this.form.controls["anoIngresso"].clearValidators();
    this.form.controls["exameQualificacao"].clearValidators();
    this.form.controls["exameProficiencia"].clearValidators();
    this.form.controls["prazoQualificacao"].clearValidators();
    this.form.controls["prazoTese"].clearValidators();
    this.form.controls["orientador"].clearValidators();
    this.form.controls["rg"].clearValidators();
    this.form.controls["dtNascimento"].clearValidators();
    this.form.controls["nacionalidade"].clearValidators();

    this.form.controls["curso"].updateValueAndValidity();
    this.form.controls["anoIngresso"].updateValueAndValidity();
    this.form.controls["exameQualificacao"].updateValueAndValidity();
    this.form.controls["exameProficiencia"].updateValueAndValidity();
    this.form.controls["prazoQualificacao"].updateValueAndValidity();
    this.form.controls["prazoTese"].updateValueAndValidity();
    this.form.controls["orientador"].updateValueAndValidity();
    this.form.controls["rg"].updateValueAndValidity();
    this.form.controls["dtNascimento"].updateValueAndValidity();
    this.form.controls["nacionalidade"].updateValueAndValidity();
  }

  selecaoPerfil(event: any) {
    if (event.value === "Aluno") {
      this.resetCamposAluno();
      this.setValidatorsCamposAluno();
    } else this.removeValidatorsCamposAluno();
  }

  imprimirEstadoDeCadaFormControl() {
    console.log(
      "estado form controle email",
      this.form.controls["email"].validator,
    );
    console.log(
      "estado form controle linkLattes",
      this.form.controls["linkLattes"].valid,
    );
    console.log(
      "estado form controle dtLattes",
      this.form.controls["dtLattes"].valid,
    );
    console.log(
      "estado form controle curso",
      this.form.controls["curso"].valid,
    );
    console.log(
      "estado form controle anoIngresso",
      this.form.controls["anoIngresso"].valid,
    );
    console.log(
      "estado form controle exameQualificacao",
      this.form.controls["exameQualificacao"].valid,
    );
    console.log(
      "estado form controle exameProficiencia",
      this.form.controls["exameProficiencia"].valid,
    );
    console.log(
      "estado form controle prazoQualificacao",
      this.form.controls["prazoQualificacao"].valid,
    );
    console.log(
      "estado form controle prazoTese",
      this.form.controls["prazoTese"].valid,
    );
    console.log(
      "estado form controle orientador",
      this.form.controls["orientador"].valid,
    );
    console.log(
      "estado form controle perfil",
      this.form.controls["perfil"].valid,
    );
    console.log("estado form controle nome", this.form.controls["nome"].valid);
    console.log("estado form controle nusp", this.form.controls["nusp"].valid);
    console.log("estado form controle rg", this.form.controls["rg"].valid);
    console.log(
      "estado form controle dtNascimento",
      this.form.controls["dtNascimento"].valid,
    );
    console.log(
      "estado form controle nacionalidade",
      this.form.controls["nacionalidade"].valid,
    );
  }

  salvarCadastro() {
    console.log("valor do form", this.form.value);
    console.log("form valido", this.form.valid);

    this.imprimirEstadoDeCadaFormControl();
  }

  blockNonNumberInput(event: any) {
    const allowedCharacters = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "Tab",
    ];
    if (!allowedCharacters.find((item) => item === event.key)) {
      event.preventDefault();
    }
  }
}
