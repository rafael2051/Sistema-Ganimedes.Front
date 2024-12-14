import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NG_ASYNC_VALIDATORS,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import {
  MAT_DATE_LOCALE,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { AuthService } from '../../services/autenticacao/auth.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
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
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent {
  form: FormGroup;

  perfis = ['ALUNO', 'DOCENTE', 'CCP'];
  anosDeIngresso: Number[] = [];
  orientadores = [
    { nome: 'Alexandre Ferreira Ramos', nusp: '12345678' },
    { nome: 'Ana Amélia Benedito Silva', nusp: '87654321' },
    { nome: 'André Carlos Busanelli de Aquino', nusp: '23456789' },
    { nome: 'Andre Cavalcanti Rocha Martins', nusp: '98765432' },
    { nome: 'Ariane Machado Lima', nusp: '34567890' },
    { nome: 'Camilo Rodrigues Neto', nusp: '76543210' },
    { nome: 'Cláudia Inés Garcia', nusp: '45678901' },
    { nome: 'Clodoaldo Aparecido de Moraes Lima', nusp: '65432109' },
    { nome: 'Daniel de Angelis Cordeiro', nusp: '56789012' },
    { nome: 'Edmir Parada Vasques Prado', nusp: '54321098' },
    { nome: 'Esteban Fernandez Tuesta', nusp: '67890123' },
    { nome: 'Fabio Nakano', nusp: '43210987' },
    { nome: 'Fátima de Lourdes dos Santos Nunes Marques', nusp: '78901234' },
    { nome: 'Fernando Auil', nusp: '32109876' },
    { nome: 'Flávio Luiz Coutinho', nusp: '89012345' },
    { nome: 'Gisele da Silva Craveiro', nusp: '21098765' },
    { nome: 'Helton Hideraldo Bíscaro', nusp: '90123456' },
    { nome: 'Ivandré Paraboni', nusp: '10987654' },
    { nome: 'João Luiz Bernardes Júnior', nusp: '01234567' },
    { nome: 'José de Jesús Pérez Alcázar', nusp: '87654320' },
    { nome: 'José Ricardo Gonçalves de Mendonça', nusp: '23456780' },
    { nome: 'Karina Valdivia Delgado', nusp: '98765430' },
    { nome: 'Karla Roberta Pereira Sampaio Lima', nusp: '34567810' },
    { nome: 'Luciane Meneguin Ortega', nusp: '76543201' },
    { nome: 'Luciano Antonio Digiampietri', nusp: '45678902' },
    { nome: 'Luciano Vieira de Araújo', nusp: '65432108' },
    { nome: 'Marcelo de Souza Lauretto', nusp: '56789021' },
    { nome: 'Marcelo Fantinato', nusp: '54321089' },
    { nome: 'Marcelo Medeiros Eler', nusp: '67890132' },
    { nome: 'Marcelo Morandini', nusp: '43210978' },
    { nome: 'Marcio Moretto Ribeiro', nusp: '78901243' },
    { nome: 'Marcos Lordello Chaim', nusp: '32109875' },
    { nome: 'Masayuki Oka Hase', nusp: '89012354' },
    { nome: 'Norton Trevisan Roman', nusp: '21098764' },
    { nome: 'Patrícia Rufino Oliveira', nusp: '90123465' },
    { nome: 'Renan Cerqueira Afonso Alves', nusp: '10987653' },
    { nome: 'Regis Rossi Alves Faria', nusp: '01234576' },
    { nome: 'Sarajane Marques Peres', nusp: '87654312' },
    { nome: 'Valdinei Freire da Silva', nusp: '23456781' },
    { nome: 'Violeta Sun', nusp: '98765431' },
  ];
  
  readonly hoje = new Date();

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      /* Podem ser alterados no perfil */
      email: ['', [Validators.required, Validators.email]], //Toddos
      linkLattes: ['', Validators.required], // Todos
      dtLattes: ['', Validators.required], // Todos
      curso: '', // Aluno
      anoIngresso: 0, //Aluno
      exameQualificacao: '', //Aluno
      exameProficiencia: '', //Aluno
      prazoQualificacao: '', //Aluno
      prazoTese: '', //Aluno
      orientador: '', //Aluno

      /* Preenchidos apenas no cadastro*/
      perfil: ['', Validators.required], //Todos
      nome: ['', Validators.required], //Todos
      nusp: ['', Validators.required], //Todos
      senha: [
        '',
        [
          Validators.required,
          Validators.maxLength(256),
          Validators.minLength(6),
        ],
      ], //Todos
      rg: '', //Aluno
      dtNascimento: '', //Aluno
      nacionalidade: '', //Aluno
    });

    const anoAtual = new Date().getFullYear();
    for (let i = anoAtual; i >= anoAtual - 8; i--) this.anosDeIngresso.push(i);
  }

  resetCamposAluno() {
    this.form.controls['curso'].reset();
    this.form.controls['anoIngresso'].reset();
    this.form.controls['exameQualificacao'].reset();
    this.form.controls['exameProficiencia'].reset();
    this.form.controls['prazoQualificacao'].reset();
    this.form.controls['prazoTese'].reset();
    this.form.controls['orientador'].reset();
    this.form.controls['rg'].reset();
    this.form.controls['dtNascimento'].reset();
    this.form.controls['nacionalidade'].reset();
  }

  setValidatorsCamposAluno() {
    this.form.controls['curso'].setValidators(Validators.required);
    this.form.controls['anoIngresso'].setValidators(Validators.required);
    this.form.controls['exameQualificacao'].setValidators(Validators.required);
    this.form.controls['exameProficiencia'].setValidators(Validators.required);
    this.form.controls['prazoQualificacao'].setValidators(Validators.required);
    this.form.controls['prazoTese'].setValidators(Validators.required);
    this.form.controls['orientador'].setValidators(Validators.required);
    this.form.controls['rg'].setValidators(Validators.required);
    this.form.controls['dtNascimento'].setValidators(Validators.required);
    this.form.controls['nacionalidade'].setValidators(Validators.required);
  }

  removeValidatorsCamposAluno() {
    this.form.controls['curso'].clearValidators();
    this.form.controls['anoIngresso'].clearValidators();
    this.form.controls['exameQualificacao'].clearValidators();
    this.form.controls['exameProficiencia'].clearValidators();
    this.form.controls['prazoQualificacao'].clearValidators();
    this.form.controls['prazoTese'].clearValidators();
    this.form.controls['orientador'].clearValidators();
    this.form.controls['rg'].clearValidators();
    this.form.controls['dtNascimento'].clearValidators();
    this.form.controls['nacionalidade'].clearValidators();

    this.form.controls['curso'].updateValueAndValidity();
    this.form.controls['anoIngresso'].updateValueAndValidity();
    this.form.controls['exameQualificacao'].updateValueAndValidity();
    this.form.controls['exameProficiencia'].updateValueAndValidity();
    this.form.controls['prazoQualificacao'].updateValueAndValidity();
    this.form.controls['prazoTese'].updateValueAndValidity();
    this.form.controls['orientador'].updateValueAndValidity();
    this.form.controls['rg'].updateValueAndValidity();
    this.form.controls['dtNascimento'].updateValueAndValidity();
    this.form.controls['nacionalidade'].updateValueAndValidity();
  }

  selecaoPerfil(event: any) {
    if (event.value === 'Aluno') {
      this.resetCamposAluno();
      this.setValidatorsCamposAluno();
    } else this.removeValidatorsCamposAluno();
  }

  imprimirEstadoDeCadaFormControl() {
    console.log(
      'estado form controle email',
      this.form.controls['email'].validator
    );
    console.log(
      'estado form controle linkLattes',
      this.form.controls['linkLattes'].valid
    );
    console.log(
      'estado form controle dtLattes',
      this.form.controls['dtLattes'].valid
    );
    console.log(
      'estado form controle curso',
      this.form.controls['curso'].valid
    );
    console.log(
      'estado form controle anoIngresso',
      this.form.controls['anoIngresso'].valid
    );
    console.log(
      'estado form controle exameQualificacao',
      this.form.controls['exameQualificacao'].valid
    );
    console.log(
      'estado form controle exameProficiencia',
      this.form.controls['exameProficiencia'].valid
    );
    console.log(
      'estado form controle prazoQualificacao',
      this.form.controls['prazoQualificacao'].valid
    );
    console.log(
      'estado form controle prazoTese',
      this.form.controls['prazoTese'].valid
    );
    console.log(
      'estado form controle orientador',
      this.form.controls['orientador'].valid
    );
    console.log(
      'estado form controle perfil',
      this.form.controls['perfil'].valid
    );
    console.log('estado form controle nome', this.form.controls['nome'].valid);
    console.log('estado form controle nusp', this.form.controls['nusp'].valid);
    console.log('estado form controle rg', this.form.controls['rg'].valid);
    console.log(
      'estado form controle dtNascimento',
      this.form.controls['dtNascimento'].valid
    );
    console.log(
      'estado form controle nacionalidade',
      this.form.controls['nacionalidade'].valid
    );
  }

  salvarCadastro() {
    console.log('valor do form', this.form.value);
    console.log('form valido', this.form.valid);

    this.imprimirEstadoDeCadaFormControl();

    const formUser = {
      nusp: this.form.controls['nusp'].value,
      nome: this.form.controls['nome'].value,
      email: this.form.controls['email'].value,
      password: this.form.controls['senha'].value,
      linkLattes: this.form.controls['linkLattes'].value,
      dtAtualizacaoLattes: this.form.controls['dtLattes'].value,
      perfil: this.form.controls['perfil'].value,
    };

    if (this.form.controls['perfil'].value === 'ALUNO') {
      const formStudent = {
        nusp: this.form.controls['nusp'].value,
        curso: this.form.controls['curso'].value,
        anoIngresso: this.form.controls['anoIngresso'].value,
        exameProficiencia: this.form.controls['exameProficiencia'].value,
        exameQualificacao: this.form.controls['exameQualificacao'].value,
        prazoMaximoQualificacao:
          this.form.controls['prazoQualificacao'].value,
        prazoMaximoDepositoTese: this.form.controls['prazoTese'].value,
        orientador: this.form.controls['orientador'].value,
        rg: this.form.controls['rg'].value,
        dtNascimento: this.form.controls['dtNascimento'].value,
        nacionalidade: this.form.controls['nacionalidade'].value,
      };

      this.service.signUpUser(formUser).subscribe({
        next: (response) => {
          this.service.signUpStudent(formStudent).subscribe({
            next: (response) => {
              console.log('response', response);
              this.router.navigate(['/login']);
            },
            error: (error) => {
              console.log('error', error);
              alert('Erro ao cadastrar o Aluno');
              this.router.navigate(['/login']);
            },
          });
        },
        error: (error) => {
          console.log('error', error);
          alert('Erro ao cadastrar usuário');
          this.router.navigate(['/login']);
        },
      });
    } else {
      this.service.signUpUser(formUser).subscribe({
        next: (response) => {
          console.log('response', response);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.log('error', error);
          alert('Erro ao cadastrar usuário');
          this.router.navigate(['/login']);
        },
      });
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
