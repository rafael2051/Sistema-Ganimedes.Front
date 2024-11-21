import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { FormularioService } from "../../services/formulario.service";
import { HttpHandler } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { Aluno, Usuario } from "../../models/usuario.model";

@Component({
  selector: "app-formulario",
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
  ],
  providers: [FormularioService],
  templateUrl: "./formulario.component.html",
  styleUrl: "./formulario.component.scss",
})
export class FormularioComponent implements OnInit {
  formAluno: FormGroup;
  formDocente: FormGroup;
  formCCP: FormGroup;
  dadosAluno: Usuario;
  // TODO: mudar para false depois que o serviço estiver funcionando
  public dadosCarregados: boolean = true;

  // @Input() usuario: Usuario;
  perfil: "aluno" | "docente" | "ccp" = "ccp";

  //Controle Formulários
  //Aluno
  public formAlunoDesabilitado: boolean = true;

  //Docente
  public exibeParecerDocente: boolean = false;
  public parecerDocenteDesabilitado: boolean = true;

  //CCP
  public exibeParecerCCP: boolean = false;
  public parecerCCPDesabilitado: boolean = true;

  // constructor(private fb: FormBuilder, private authService: AuthService) {
  constructor(
    private fb: FormBuilder,
    private servico: FormularioService,
    private route: ActivatedRoute,
  ) {
    this.formAluno = this.fb.group({
      artigosEscrita: [0, Validators.required],
      artigosSubmetidos: [0, Validators.required],
      artigosAceitos: [0, Validators.required],
      atividadesAcademicas: ["", Validators.required],
      atividadesPesquisa: ["", Validators.required],
      declaracaoCCP: ["", Validators.required],
      dificuldades: ["", Validators.required],
      conceitosDivulgados: ["", Validators.required],
      parecerDocente: [""],
      parecerCCP: [""],
    });

    this.formDocente = this.fb.group({
      parecerDocente: ["", Validators.required],
    });

    this.formCCP = this.fb.group({
      parecerCCP: ["", Validators.required],
    });

    let nusp: any;
    this.route.paramMap.subscribe((params) => {
      nusp = params.get("nusp");
      // TODO: descomentar depois que o serviço estiver funcionando
      // this.buscarDadosAluno(nusp);
    });
  }

  ngOnInit() {
    this.controleFormularios();
    console.log("O perfil deste usuário é", this.perfil);
  }

  private controleFormularios() {
    if (this.perfil === "aluno") {
      //TODO: implementar o controle que verifica se o formulário do aluno deve estar habilitado ou não.
      // O formulário deve estar habilitado apenas se a data de vencimento for maior que a data atual.
      // A data de vencimento deve ser fornecida pelo backend

      this.formAlunoDesabilitado = false;
    } else if (this.perfil === "docente") {
      this.parecerDocenteDesabilitado = false;
      this.exibeParecerDocente = true;
    } else {
      this.exibeParecerDocente = true;
      this.exibeParecerCCP = true;
      this.parecerCCPDesabilitado = false;
    }
  }

  private buscarDadosAluno(nusp: any): void {
    this.servico.buscarDadosAluno(nusp).subscribe((data) => {
      this.dadosAluno = data;
      this.dadosCarregados = true;
    });
  }

  public sendForm(): void {}

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
