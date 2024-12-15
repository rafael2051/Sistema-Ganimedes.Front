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
  public dadosCarregados: boolean = false;

  perfil = sessionStorage.getItem('perfil');
  usuario: Usuario;
  nusp_aluno: string | null;
  nusp_orientador: string | null;
  id_formulario: number;
  nome_aluno = '';

  //Controle Formulários
  //Aluno
  public formAlunoDesabilitado: boolean = true;
  textoSemestre = '';
  textoAno = '';

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
      aprovacoesDesdeInicio: [0, Validators.required],
      reprovacoesSemestreAtual: [0, Validators.required],
      reprovacoesDesdeInicio: [0, Validators.required],
      atividadesAcademicas: ['', Validators.required],
      atividadesPesquisa: ['', Validators.required],
      declaracaoCCP: ['', Validators.required],
      dificuldades: ['', Validators.required],
      conceitosDivulgados: ['', Validators.required],
    });

    this.formDocente = this.fb.group({
      parecer: ['', Validators.required],
      conceito: ['', Validators.required],
    });

    this.formCCP = this.fb.group({
      parecer: ['', Validators.required],
      conceito: ['', Validators.required],
    });

    this.defineUsuarioEStudentData();
    this.defineTextoFormAluno();

    this.route.paramMap.subscribe((params) => {
      this.nusp_aluno = params.get('nusp');
      this.buscarDadosFormulario(this.nusp_aluno);
    });
  }

  ngOnInit() {
    this.controleFormularios();
    console.log('O perfil deste usuário é', this.perfil);
  }

  defineUsuarioEStudentData() {
    const temp = sessionStorage.getItem('usuario');
    if (temp) {
      const temp_parsed = JSON.parse(temp);
      if (temp_parsed.perfil === 'ALUNO') this.usuario = temp_parsed as Aluno;
      else this.usuario = temp_parsed as Docente;

      console.log('Usuário logado:', this.usuario);
    }

    if(this.perfil === "ALUNO") {
      const student_data = sessionStorage.getItem('student_data');
      if (student_data) {
        const student_data_parsed = JSON.parse(student_data);
        this.nusp_orientador = student_data_parsed.orientador;
      }
    }
    
  }

  defineTextoFormAluno() {
    const hoje = new Date();
    const mes = hoje.getMonth();
    const ano = hoje.getFullYear();

    this.textoSemestre = mes == 0 || mes >= 8 ? '2º' : '1º';
    this.textoAno = mes == 0 ? `${ano - 1}` : `${ano}`;
  }

  botaoEnviarDesabilitado(): boolean {
    if (!this.formAlunoDesabilitado && this.formAluno.valid) return false;
    else if (
      this.exibeParecerDocente &&
      !this.parecerDocenteDesabilitado &&
      this.formDocente.valid
    )
      return false;
    else if (
      this.exibeParecerCCP &&
      !this.parecerCCPDesabilitado &&
      this.formCCP.valid
    )
      return false;

    return true;
  }

  controleFormularios() {
    if (this.perfil === 'ALUNO') this.formAlunoDesabilitado = false;
    else if (this.perfil === 'DOCENTE') {
      this.parecerDocenteDesabilitado = false;
      this.exibeParecerDocente = true;
    } else {
      this.exibeParecerDocente = true;
      this.exibeParecerCCP = true;
      this.parecerCCPDesabilitado = false;
    }
  }

  atribuirDadosAoFormularioDeAluno(data: any) {
    // TODO: atribuir dados retornados no formulário
    console.log('Dados retornados:', data);

    if(!data)
      return;

    this.formAluno.controls['artigosEscrita'].setValue(data.artigos_em_escrita);
    this.formAluno.controls['artigosSubmetidos'].setValue(
      data.artigos_em_avaliacao
    );
    this.formAluno.controls['artigosAceitos'].setValue(data.artigos_aceitos);
    this.formAluno.controls['aprovacoesDesdeInicio'].setValue(
      data.aprovacoesTodoCurso
    );
    this.formAluno.controls['reprovacoesSemestreAtual'].setValue(
      data.reprovacoesSemestreAtual
    );
    this.formAluno.controls['reprovacoesDesdeInicio'].setValue(
      data.reprovacoesTodoCurso
    );
    this.formAluno.controls['atividadesAcademicas'].setValue(
      data.atividades_academicas
    );
    this.formAluno.controls['atividadesPesquisa'].setValue(
      data.atividades_pesquisa
    );
    this.formAluno.controls['declaracaoCCP'].setValue(
      data.declaracao_adicional_comissao
    );
    if (data.dificuldade_apoio_coordenacao) {
      this.formAluno.controls['dificuldades'].setValue('1');
    } else {
      this.formAluno.controls['dificuldades'].setValue('2');
    }

    this.formAluno.controls['artigosEscrita'].updateValueAndValidity();
    this.formAluno.controls['artigosSubmetidos'].updateValueAndValidity();
    this.formAluno.controls['artigosAceitos'].updateValueAndValidity();
    this.formAluno.controls['aprovacoesDesdeInicio'].updateValueAndValidity();
    this.formAluno.controls[
      'reprovacoesSemestreAtual'
    ].updateValueAndValidity();
    this.formAluno.controls['reprovacoesDesdeInicio'].updateValueAndValidity();
    this.formAluno.controls['atividadesAcademicas'].updateValueAndValidity();
    this.formAluno.controls['atividadesPesquisa'].updateValueAndValidity();
    this.formAluno.controls['declaracaoCCP'].updateValueAndValidity();
    this.formAluno.controls['dificuldades'].updateValueAndValidity();

    this.nome_aluno = data.nome_aluno;
  }

  atribuirPareceresFormDocenteECCP(data: any) {
    if (this.perfil === 'DOCENTE') {
      this.formDocente.controls['parecerDocente'].setValue(
        data.parecer_docente
      );
      this.formDocente.controls['conceito'].setValue(data.conceito);

      this.formDocente.controls['parecerDocente'].updateValueAndValidity();
      this.formDocente.controls['conceito'].updateValueAndValidity();
    } else if (this.perfil === 'CCP') {
      this.formCCP.controls['parecerCCP'].setValue(data.parecer_ccp);
      this.formCCP.controls['conceito'].setValue(data.conceito);

      this.formCCP.controls['parecerCCP'].updateValueAndValidity();
      this.formCCP.controls['conceito'].updateValueAndValidity();
    }
  }

  buscarDadosFormulario(nusp_aluno: any): void {
    this.servico
      .buscarDadosFormulario(nusp_aluno, this.usuario.nusp)
      .subscribe({
        next: (res) => {
          this.atribuirDadosAoFormularioDeAluno(res);

          this.dadosCarregados = true;

          if (this.id_formulario && this.perfil && this.perfil !== 'ALUNO')
            this.servico
              .buscarParecer(this.id_formulario, this.perfil, this.usuario.nusp)
              .subscribe({
                next: (res) => {
                  this.atribuirPareceresFormDocenteECCP(res);
                },
                error: (err) =>
                  console.log('Erro ao buscar os pareceres do formulário', err),
              });
        },
        error: (err) =>
          console.log(
            'Erro ao buscar dados preenchidos pelo aluno no formulário',
            err
          ),
      });
  }

  sendForm(): void {
    if (this.perfil === 'ALUNO')
      this.servico
        .salvarFormulario(
          'ALUNO',
          this.formAluno.value,
          this.nusp_aluno,
          this.nusp_orientador
        )
        .subscribe((res) => {
          console.log('resposta salvamento form aluno', res);
        });
    else if (this.perfil === 'DOCENTE')
      this.servico
        .salvarParecer(this.formDocente.value, this.usuario.nusp, this.perfil)
        .subscribe((res) => {
          console.log('resposta salvamento form docente', res);
        });
    else if (this.perfil === 'CCP')
      this.servico
        .salvarParecer(this.formCCP.value, this.usuario.nusp, this.perfil)
        .subscribe((res) => {
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
