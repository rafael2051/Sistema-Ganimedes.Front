import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ListaFormulariosComponent } from './lista-formularios.component';
import { FormularioService } from '../../services/formulario/formulario.service';
import { FormMetaData } from '../../models/formulario.model';
import { HttpBackend, HttpClient, HttpHandler } from '@angular/common/http';

describe('ListaFormulariosComponent', () => {
  let component: ListaFormulariosComponent;
  let fixture: ComponentFixture<ListaFormulariosComponent>;
  let mockRouter: any;
  let mockFormularioService: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    };

    mockFormularioService = {
      listarFormularios: jest.fn().mockReturnValue(of([])),
    };

    await TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: FormularioService, useValue: mockFormularioService },
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaFormulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
