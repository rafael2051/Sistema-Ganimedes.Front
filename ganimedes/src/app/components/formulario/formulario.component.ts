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
  public dadosCarregados: boolean = true;

  perfil = sessionStorage.getItem('perfil');
  usuario: Usuario;
  nusp_aluno: string | null;
  nusp_orientador: string | null;
  id_formulario: number;
  nome_aluno = '';
  artigosEscrita = '';
  artigosSubmetidos = '';
  artigosAceitos = '';
  aprovacoesDesdeInicio = '';
  reprovacoesSemestreAtual = '';
  reprovacoesDesdeInicio = '';
  atividadesAcademicas = '';
  resumoAtividades = '';
  declaracoesAdicionais = '';
  dificuladesNoCurso = false;
  disciplinasConceitoDivulgado = false;


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
    const data_simulated = {
      id_formulario: 16,
      aluno: '76767676',
      orientador: '34567810',
      nome_aluno: 'Joãozinho USP',
      artigos_em_escrita: 2,
      artigos_em_avaliacao: 1,
      artigos_aceitos: 1,
      aprovacoesTodoCurso: 10,
      reprovacoesSemestreAtual: 1,
      reprovacoesTodoCurso: 1,
      atividades_academicas: 'Intercâmbio na Universidade de Roma na Itália.',
      atividades_pesquisa:
        'Estou desenvolvendo pesquisa em IA sobre comparação entre diferentes tipos de algoritmos de aprendizagem de máquina supervisonado e preciso apresentar os resultados de quais os mais eficientes até o final do curso.',
      declaracao_adicional_comissao: 'Não;',
      dificuldade_apoio_coordenacao: true,
      data_preenchimento: '2024-12-14T00:00:00',
    };
    console.log('dados simulados', data_simulated);

    if (!data_simulated) return;

    this.formAluno.patchValue({
      artigosEscrita: data_simulated.artigos_em_escrita,
      artigosSubmetidos: data_simulated.artigos_em_avaliacao,
      artigosAceitos: data_simulated.artigos_aceitos,
      aprovacoesDesdeInicio: data_simulated.aprovacoesTodoCurso,
      reprovacoesSemestreAtual: data_simulated.reprovacoesSemestreAtual,
      reprovacoesDesdeInicio: data_simulated.reprovacoesTodoCurso,
      atividadesAcademicas: data_simulated.atividades_academicas,
      atividadesPesquisa: data_simulated.atividades_pesquisa,
      declaracaoCCP: data_simulated.declaracao_adicional_comissao,
      dificuldades: data_simulated.dificuldade_apoio_coordenacao ? '1' : '2',
      conceitosDivulgados: '1', //Mockado pois o bd não está salvando esse campo
    });

    this.id_formulario = data.id_formulario;
    this.nome_aluno = data.nome_aluno;
    this.artigosEscrita = data.artigos_em_escrita;
    this.artigosSubmetidos = data.artigos_em_avaliacao;
    this.artigosAceitos = data.artigos_aceitos;
    this.aprovacoesDesdeInicio = data.aprovacoes_todo_curso;
    this.reprovacoesSemestreAtual = data.reprovacoes_semestre_atual;
    this.reprovacoesDesdeInicio = data.reprovacoesDesdeInicio;
    this.atividadesAcademicas = data.atividades_academicas;
    this.resumoAtividades = data.resumoAtividades;
    this.declaracoesAdicionais = data.declaracao_adicional_comissao;
    this.dificuladesNoCurso = data.dificuladesNoCurso;
    this.disciplinasConceitoDivulgado = data.disciplinasConceitoDivulgado;

  }

  atribuirPareceresFormDocenteECCP(data: any, tipo: string) {
    if (tipo === 'DOCENTE')
      this.formDocente.patchValue({
        parecer: data.parecer_docente,
        conceito: data.conceito,
      });
    else if (tipo === 'CCP')
      this.formCCP.patchValue({
        parecerCCP: data.parecer_ccp,
        conceito: data.conceito,
      });
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
            else if (this.perfil === 'CCP')
              forkJoin({
                parecerDocente: this.servico.buscarParecer(
                  this.id_formulario,
                  'DOCENTE',
                  this.usuario.nusp
                ),
                parecerCCP: this.servico.buscarParecer(
                  this.id_formulario,
                  this.usuario.perfil,
                  this.usuario.nusp
                ),
              }).subscribe({
                next: (res) => {
                  this.atribuirPareceresFormDocenteECCP(
                    res.parecerDocente,
                    'DOCENTE'
                  );
                  this.atribuirPareceresFormDocenteECCP(res.parecerCCP, 'CCP');
                },
                error: (err) =>
                  console.log('Erro ao buscar os pareceres do formulário', err),
              });
        },
        error: (err) => {
          //TODO: retirar esta chamada
          this.atribuirDadosAoFormularioDeAluno({});

          console.log(
            'Erro ao buscar dados preenchidos pelo aluno no formulário',
            err
          );
        },
      });
  }

  sendForm(): void {
    console.log(this.id_formulario);

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
