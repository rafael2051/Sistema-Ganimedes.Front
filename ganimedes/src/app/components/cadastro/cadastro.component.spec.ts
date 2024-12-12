import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/autenticacao/auth.service';
import { CadastroComponent } from './cadastro.component';
import { of, throwError } from 'rxjs';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = {
      signUpUser: jest.fn(),
      signUpStudent: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    const authService = TestBed.inject(AuthService);
    const router = TestBed.inject(Router);

    component = new CadastroComponent(fb, authService, router);
  });

  it('should reset fields for Aluno', () => {
    component.resetCamposAluno();
    expect(component.form.controls['curso'].value).toBeNull();
    expect(component.form.controls['anoIngresso'].value).toBeNull();
    expect(component.form.controls['exameQualificacao'].value).toBeNull();
    expect(component.form.controls['exameProficiencia'].value).toBeNull();
    expect(component.form.controls['prazoQualificacao'].value).toBeNull();
    expect(component.form.controls['prazoTese'].value).toBeNull();
    expect(component.form.controls['orientador'].value).toBeNull();
    expect(component.form.controls['rg'].value).toBeNull();
    expect(component.form.controls['dtNascimento'].value).toBeNull();
    expect(component.form.controls['nacionalidade'].value).toBeNull();
  });

  it('should set validators for Aluno fields', () => {
    component.setValidatorsCamposAluno();
    expect(component.form.controls['curso'].validator).toBeTruthy();
    expect(component.form.controls['anoIngresso'].validator).toBeTruthy();
    expect(component.form.controls['exameQualificacao'].validator).toBeTruthy();
    expect(component.form.controls['exameProficiencia'].validator).toBeTruthy();
    expect(component.form.controls['prazoQualificacao'].validator).toBeTruthy();
    expect(component.form.controls['prazoTese'].validator).toBeTruthy();
    expect(component.form.controls['orientador'].validator).toBeTruthy();
    expect(component.form.controls['rg'].validator).toBeTruthy();
    expect(component.form.controls['dtNascimento'].validator).toBeTruthy();
    expect(component.form.controls['nacionalidade'].validator).toBeTruthy();
  });

  it('should remove validators for Aluno fields', () => {
    component.removeValidatorsCamposAluno();
    expect(component.form.controls['curso'].validator).toBeNull();
    expect(component.form.controls['anoIngresso'].validator).toBeNull();
    expect(component.form.controls['exameQualificacao'].validator).toBeNull();
    expect(component.form.controls['exameProficiencia'].validator).toBeNull();
    expect(component.form.controls['prazoQualificacao'].validator).toBeNull();
    expect(component.form.controls['prazoTese'].validator).toBeNull();
    expect(component.form.controls['orientador'].validator).toBeNull();
    expect(component.form.controls['rg'].validator).toBeNull();
    expect(component.form.controls['dtNascimento'].validator).toBeNull();
    expect(component.form.controls['nacionalidade'].validator).toBeNull();
  });

  it('should handle perfil selection', () => {
    const event = { value: 'Aluno' };
    const resetCamposAlunoSpy = jest.spyOn(component, 'resetCamposAluno');
    const setValidatorsCamposAlunoSpy = jest.spyOn(
      component,
      'setValidatorsCamposAluno'
    );
    const removeValidatorsCamposAlunoSpy = jest.spyOn(
      component,
      'removeValidatorsCamposAluno'
    );

    component.selecaoPerfil(event);
    expect(resetCamposAlunoSpy).toHaveBeenCalled();
    expect(setValidatorsCamposAlunoSpy).toHaveBeenCalled();
    expect(removeValidatorsCamposAlunoSpy).not.toHaveBeenCalled();

    event.value = 'Docente';
    component.selecaoPerfil(event);
    expect(removeValidatorsCamposAlunoSpy).toHaveBeenCalled();
  });

  it('should print form control states', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    component.imprimirEstadoDeCadaFormControl();
    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should save cadastro for Aluno', () => {
    component.form.controls['perfil'].setValue('Aluno');
    component.form.controls['nusp'].setValue('123456');
    component.form.controls['nome'].setValue('Test User');
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['senha'].setValue('password');
    component.form.controls['linkLattes'].setValue('http://lattes.cnpq.br');
    component.form.controls['dtLattes'].setValue('2023-01-01');
    component.form.controls['curso'].setValue('Test Course');
    component.form.controls['anoIngresso'].setValue(2023);
    component.form.controls['exameProficiencia'].setValue('Passed');
    component.form.controls['exameQualificacao'].setValue('Passed');
    component.form.controls['prazoQualificacao'].setValue('2023-12-31');
    component.form.controls['prazoTese'].setValue('2025-12-31');
    component.form.controls['orientador'].setValue('Test Orientador');
    component.form.controls['rg'].setValue('123456789');
    component.form.controls['dtNascimento'].setValue('2000-01-01');
    component.form.controls['nacionalidade'].setValue('Brazilian');

    authServiceMock.signUpUser.mockReturnValue(of({}));
    authServiceMock.signUpStudent.mockReturnValue(of({}));

    component.salvarCadastro();
    expect(authServiceMock.signUpUser).toHaveBeenCalled();
    expect(authServiceMock.signUpStudent).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should save cadastro for non-Aluno', () => {
    component.form.controls['perfil'].setValue('Docente');
    component.form.controls['nusp'].setValue('123456');
    component.form.controls['nome'].setValue('Test User');
    component.form.controls['email'].setValue('test@example.com');
    component.form.controls['senha'].setValue('password');
    component.form.controls['linkLattes'].setValue('http://lattes.cnpq.br');
    component.form.controls['dtLattes'].setValue('2023-01-01');

    authServiceMock.signUpUser.mockReturnValue(of({}));

    component.salvarCadastro();
    expect(authServiceMock.signUpUser).toHaveBeenCalled();
    expect(authServiceMock.signUpStudent).not.toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should block non-number input', () => {
    const event = { key: 'a', preventDefault: jest.fn() };
    component.blockNonNumberInput(event);
    expect(event.preventDefault).toHaveBeenCalled();

    event.key = '1';
    component.blockNonNumberInput(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });
});
