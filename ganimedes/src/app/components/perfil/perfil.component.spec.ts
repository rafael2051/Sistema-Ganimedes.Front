import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let router: Router;

  beforeEach(() => {
    const routerSpy = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [FormBuilder, { provide: Router, useValue: routerSpy }],
    });

    const fb = TestBed.inject(FormBuilder);
    router = TestBed.inject(Router);
    component = new PerfilComponent(fb, router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formPerfil with correct controls', () => {
    expect(component.formPerfil.contains('email')).toBeTruthy();
    expect(component.formPerfil.contains('linkLattes')).toBeTruthy();
    expect(component.formPerfil.contains('dtLattes')).toBeTruthy();
    expect(component.formPerfil.contains('curso')).toBeFalsy();
    expect(component.formPerfil.contains('anoIngresso')).toBeFalsy();
    expect(component.formPerfil.contains('exameProficiencia')).toBeFalsy();
    expect(component.formPerfil.contains('exameQualificacao')).toBeFalsy();
    expect(component.formPerfil.contains('prazoQualificacao')).toBeFalsy();
    expect(component.formPerfil.contains('prazoTese')).toBeFalsy();
    expect(component.formPerfil.contains('orientador')).toBeFalsy();
  });

  it('should call salvarPerfil and log message', () => {
    console.log = jest.fn();
    component.salvarPerfil();
    expect(console.log).toHaveBeenCalledWith('salvando o perfil');
  });

  it('should define anosDeIngresso correctly', () => {
    component.anosDeIngresso = [];
    component.defineAnosDeIngresso();
    const anoAtual = new Date().getFullYear();
    const expectedAnos = Array.from({ length: 9 }, (_, i) => anoAtual - i);
    expect(component.anosDeIngresso).toEqual(expectedAnos);
  });

  it('should call buscarDadosUsuario', () => {
    // Mock implementation if needed
    component.buscarDadosUsuario();
    // Add assertions if there are any side effects to test
  });

  it('should return true if perfil is not "Aluno" in desabilitaSeNaoAluno', () => {
    component.perfil = 'Professor';
    expect(component.desabilitaSeNaoAluno()).toBeTruthy();
  });

  it('should return false if perfil is "Aluno" in desabilitaSeNaoAluno', () => {
    component.perfil = 'Aluno';
    expect(component.desabilitaSeNaoAluno()).toBeFalsy();
  });

  it('should navigate to correct URL in redirecionarFormulario', () => {
    component.redirecionarFormulario();
    expect(router.navigate).toHaveBeenCalledWith(['/formulario/13123']);
  });
});
