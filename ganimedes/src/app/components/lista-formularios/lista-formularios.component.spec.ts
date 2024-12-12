import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ListaFormulariosComponent } from './lista-formularios.component';
import { Formulario } from '../../models/formulario.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListaFormulariosComponent', () => {
  let component: ListaFormulariosComponent;
  let fixture: ComponentFixture<ListaFormulariosComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, MatTableModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaFormulariosComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the correct URL when redirecionaAluno is called', () => {
    const aluno = new Formulario(
      'form1',
      'abr./2024',
      '123456',
      'João Silva',
      'Dr. Silva',
      2,
      1,
      1,
      'Participação em seminários',
      'Pesquisa sobre IA',
      'Declaração de CCP',
      'Falta de recursos',
      'Conceitos de Machine Learning',
      'Aprovado',
      'Aprovado',
      'Bom desempenho',
      'Aprovado com louvor'
    );

    const navigateSpy = jest.spyOn(router, 'navigate');

    component.redirecionaAluno(aluno);
    expect(navigateSpy).toHaveBeenCalledWith(['/formulario/123456']);
  });
});
