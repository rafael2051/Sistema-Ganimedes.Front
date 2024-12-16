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
import { forkJoin } from 'rxjs';

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
  nome_aluno = 'Aluno';
  conceito_docente: number;
  conceito_ccp: number;
  
  artigosEscrita = '';
  artigosSubmetidos = '';
  artigosAceitos = '';
  aprovacoesDesdeInicio = '';
  reprovacoesSemestreAtual = '';
  reprovacoesDesdeInicio = '';
  atividadesAcademicas = '';
  resumoAtividades = '';
  declaracoesAdicionais = '';
  parecerDocente = '';
  parecerCcp = '';


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
      parecerCCP: ['', Validators.required],
      conceitoCCP: ['', Validators.required],
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

    if (this.perfil === 'ALUNO') {
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

    if (!data){
      this.defineNomeAlunoView();
      return;
    }

    this.formAluno.patchValue({
      dificuldades: data.dificuldade_apoio_coordenacao ? '1' : '0',
      conceitosDivulgados: data.disciplinas_conceito_divulgado ? '1' : '0', 
    });

    this.id_formulario = data.id_formulario;
    this.nome_aluno = data.nome_aluno;

    this.artigosEscrita = data.artigos_em_escrita;
    this.artigosSubmetidos = data.artigos_em_avaliacao;
    this.artigosAceitos = data.artigos_aceitos;
    this.aprovacoesDesdeInicio = data.aprovacoes_todo_curso;
    this.reprovacoesSemestreAtual = data.reprovacoes_semestre_atual;
    this.reprovacoesDesdeInicio = data.reprovacoes_todo_curso;
    this.atividadesAcademicas = data.atividades_academicas;
    this.resumoAtividades = data.atividades_pesquisa;
    this.declaracoesAdicionais = data.declaracao_adicional_comissao;

    this.defineNomeAlunoView();
  }

  atribuirPareceresFormDocenteECCP(data: any, tipo: "DOCENTE" | "CCP") {
    console.log('dados do atribuirPareceresFormDocenteECCP', data, tipo);

    if(tipo === "DOCENTE"){
      this.formDocente.patchValue({
        conceito: `${data.conceito}`,
      });
      this.parecerDocente = data.parecer;
    } else if(tipo === "CCP") {
      this.formCCP.patchValue({
        conceitoCCP: `${data.conceito}`,
      });
      this.parecerCcp = data.parecer;
    }
  }

  buscarDadosFormulario(nusp_aluno: any): void {
    this.servico
      .buscarDadosFormulario(nusp_aluno, this.usuario.nusp)
      .subscribe({
        next: (res) => {
          this.atribuirDadosAoFormularioDeAluno(res);
          
          this.dadosCarregados = true;

          if (this.id_formulario && this.perfil)
            if (this.perfil === 'DOCENTE')
              this.servico
                .buscarParecer(
                  this.id_formulario,
                  this.perfil,
                  this.usuario.nusp
                )
                .subscribe({
                  next: (res) =>
                    this.atribuirPareceresFormDocenteECCP(res, 'DOCENTE'),
                  error: (err) =>
                    console.log(
                      'Erro ao buscar os pareceres do formulário',
                      err
                    ),
                });
            else if (this.perfil === 'CCP'){
              this.servico.buscarParecer(this.id_formulario, 'DOCENTE', this.usuario.nusp)
              .subscribe({
                next: res => {
                  this.atribuirPareceresFormDocenteECCP(res, "DOCENTE")
                  
                  this.servico.buscarParecer(this.id_formulario, this.usuario.perfil, this.usuario.nusp)
                  .subscribe({
                    next: res => this.atribuirPareceresFormDocenteECCP(res, "CCP"),
                    error: err => console.log('Erro ao buscar o parecer da CCP', err)
                  })
                },
                error: err => console.log('Erro ao buscar o parecer do docente', err)
              })
            }
        },
        error: (err) => {
          console.log(
            'Erro ao buscar dados preenchidos pelo aluno no formulário',
            err
          );
        },
      });
  }

  sendForm(): void {
    console.log('id do form no sendForm', this.id_formulario);

    if (this.perfil === 'ALUNO' && !this.id_formulario)
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
    else if (this.perfil === 'ALUNO' && this.id_formulario)
      this.servico.atualizarFormulario(
        this.formAluno.value,
        this.nusp_aluno,
        this.nusp_orientador
      )
      .subscribe((res) => {
        console.log('resposta da atualização do formulário', res)
      })
    else if (this.perfil === 'DOCENTE')
      this.servico
        .salvarParecer(
          this.id_formulario,
          this.formDocente.value,
          this.usuario.nusp,
          this.perfil
        )
        .subscribe((res) => {
          console.log('resposta salvamento form docente', res);
        });
    else if (this.perfil === 'CCP')
      this.servico
        .salvarParecer(
          this.id_formulario,
          this.formCCP.value,
          this.usuario.nusp,
          this.perfil
        )
        .subscribe((res) => {
          console.log('resposta salvamento form ccp', res);
        });
  }

  defineNomeAlunoView(){
    if (this.nome_aluno === 'Aluno' && this.perfil === "ALUNO"){
      this.nome_aluno = this.usuario.nomeCompleto;
    }
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
