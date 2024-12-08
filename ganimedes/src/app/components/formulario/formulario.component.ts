import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Aluno, Docente, Usuario } from '../../models/usuario.model';
import { FormularioService } from '../../services/formulario/formulario.service';

@Component({
  selector: 'app-formulario',
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
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss',
})
export class FormularioComponent implements OnInit {
  formAluno: FormGroup;
  formDocente: FormGroup;
  formCCP: FormGroup;

  // TODO: mudar para false depois que o serviço estiver funcionando
  public dadosCarregados: boolean = true;

  perfil = sessionStorage.getItem('perfil');
  usuario: Usuario;

  //Controle Formulários
  //Aluno
  public formAlunoDesabilitado: boolean = true;

  //Docente
  public exibeParecerDocente: boolean = false;
  public parecerDocenteDesabilitado: boolean = true;

  //CCP
  public exibeParecerCCP: boolean = false;
  public parecerCCPDesabilitado: boolean = true;

  constructor(
    private fb: FormBuilder,
    private servico: FormularioService,
    private route: ActivatedRoute
  ) {
    this.formAluno = this.fb.group({
      artigosEscrita: [0, Validators.required],
      artigosSubmetidos: [0, Validators.required],
      artigosAceitos: [0, Validators.required],
      atividadesAcademicas: ['', Validators.required],
      atividadesPesquisa: ['', Validators.required],
      declaracaoCCP: ['', Validators.required],
      dificuldades: ['', Validators.required],
      conceitosDivulgados: ['', Validators.required],
    });

    this.formDocente = this.fb.group({
      parecerDocente: ['', Validators.required],
    });

    this.formCCP = this.fb.group({
      parecerCCP: ['', Validators.required],
    });

    const temp = sessionStorage.getItem('usuario');
    if (temp) {
      const temp_parsed = JSON.parse(temp);
      if (temp_parsed.perfil === 'Aluno') this.usuario = temp_parsed as Aluno;
      else this.usuario = temp_parsed as Docente;

      console.log('Usuário logado:', this.usuario);
    }

    let nusp: any;
    this.route.paramMap.subscribe((params) => {
      nusp = params.get('nusp');
      this.buscarDadosFormulario(nusp);
    });
  }

  ngOnInit() {
    this.controleFormularios();
    console.log('O perfil deste usuário é', this.perfil);
  }

  private controleFormularios() {
    if (this.perfil === 'Aluno') {
      //TODO: implementar o controle que verifica se o formulário do aluno deve estar habilitado ou não.
      // O formulário deve estar habilitado apenas se a data de vencimento for maior que a data atual.
      // A data de vencimento deve ser fornecida pelo backend

      this.formAlunoDesabilitado = false;
    } else if (this.perfil === 'Docente') {
      this.parecerDocenteDesabilitado = false;
      this.exibeParecerDocente = true;
    } else {
      this.exibeParecerDocente = true;
      this.exibeParecerCCP = true;
      this.parecerCCPDesabilitado = false;
    }
  }

  private buscarDadosFormulario(nusp: any): void {
    this.servico.buscarDadosFormulario(nusp).subscribe((data) => {
      // TODO: atribuir dados retornados no formulário
      // this.formAluno = data;
      this.dadosCarregados = true;
    });
  }

  public sendForm(): void {
    if (this.perfil === 'Aluno')
      this.servico.salvarFormulario(this.formAluno.value).subscribe((res) => {
        console.log('resposta salvamento form aluno', res);
      });
    else if (this.perfil === 'Docente')
      this.servico.salvarFormulario(this.formDocente.value).subscribe((res) => {
        console.log('resposta salvamento form docente', res);
      });
    else
      this.servico.salvarFormulario(this.formCCP.value).subscribe((res) => {
        console.log('resposta salvamento form ccp', res);
      });
  }

  blockNonNumberInput(event: any) {
    const allowedCharacters = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '0',
      'Tab',
    ];
    if (!allowedCharacters.find((item) => item === event.key)) {
      event.preventDefault();
    }
  }
}
