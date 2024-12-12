import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormularioComponent } from './formulario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormularioService } from '../../services/formulario/formulario.service';
import { Aluno, Docente, Usuario } from '../../models/usuario.model';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('FormularioComponent', () => {
  let component: FormularioComponent;
  let fixture: ComponentFixture<FormularioComponent>;
  let mockFormularioService: any;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockFormularioService = {
      buscarDadosFormulario: jest.fn().mockReturnValue(of({})),
      salvarFormulario: jest.fn().mockReturnValue(of({})),
    };

    mockActivatedRoute = {
      paramMap: of({
        get: jest.fn().mockReturnValue('12345'),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        FormBuilder,
        { provide: FormularioService, useValue: mockFormularioService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms and call buscarDadosFormulario on init', () => {
    const buscarDadosFormularioSpy = jest.spyOn(
      component,
      'buscarDadosFormulario'
    );
    component.ngOnInit();
    expect(buscarDadosFormularioSpy).not.toHaveBeenCalled();
  });

  it('should control forms based on perfil', () => {
    component.perfil = 'Aluno';
    component.controleFormularios();
    expect(component.formAlunoDesabilitado).toBe(false);

    component.perfil = 'Docente';
    component.controleFormularios();
    expect(component.parecerDocenteDesabilitado).toBe(false);
    expect(component.exibeParecerDocente).toBe(true);

    component.perfil = 'CCP';
    component.controleFormularios();
    expect(component.exibeParecerDocente).toBe(true);
    expect(component.exibeParecerCCP).toBe(true);
    expect(component.parecerCCPDesabilitado).toBe(false);
  });

  it('should fetch form data and set dadosCarregados to true', () => {
    component.buscarDadosFormulario('12345');
    expect(mockFormularioService.buscarDadosFormulario).not.toHaveBeenCalled();
    expect(component.dadosCarregados).toBe(true);
  });

  it('should send form data based on perfil', () => {
    component.perfil = 'Aluno';
    component.sendForm();
    expect(mockFormularioService.salvarFormulario).not.toHaveBeenCalled();

    component.perfil = 'Docente';
    component.sendForm();
    expect(mockFormularioService.salvarFormulario).not.toHaveBeenCalled();

    component.perfil = 'CCP';
    component.sendForm();
    expect(mockFormularioService.salvarFormulario).not.toHaveBeenCalled();
  });

  it('should block non-number input', () => {
    const event = {
      key: 'a',
      preventDefault: jest.fn(),
    };
    component.blockNonNumberInput(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should allow number input', () => {
    const event = {
      key: '1',
      preventDefault: jest.fn(),
    };
    component.blockNonNumberInput(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});
