import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FormularioService } from './formulario.service';
import { Aluno } from '../../models/usuario.model';

describe('FormularioService', () => {
  let service: FormularioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FormularioService],
    });
    service = TestBed.inject(FormularioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch form data for a given nusp', () => {
    const dummyAluno = new Aluno(
      'João da Silva',
      '123456',
      'joao.silva@example.com',
      'http://lattes.cnpq.br/1234567890123456',
      'Aluno',
      'Mestrado',
      2021,
      'Aprovado',
      'Não Realizado',
      new Date('2023-12-31'),
      new Date('2025-12-31'),
      'Dr. José Pereira',
      '123456789',
      new Date('1995-05-15'),
      'Brasileiro'
    );
    const nusp = '123456';

    service.buscarDadosFormulario(nusp).subscribe((aluno) => {
      expect(aluno).toEqual(dummyAluno);
    });

    const req = httpMock.expectOne(`${service['_urlApi']}/getForm/${nusp}`);
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(
      `Bearer ${service['_token']}`
    );
    req.flush(dummyAluno);
  });

  it('should list forms metadata for a given nusp_docente', () => {
    const nusp_docente = '654321';
    const dummyResponse = {
      /* mock response data */
    };

    service.listarFormularios(nusp_docente).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['_urlApi']}/getFormsMetadata`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(
      `Bearer ${service['_token']}`
    );
    expect(req.request.body).toBe(nusp_docente);
    req.flush(dummyResponse);
  });

  it('should save form data', () => {
    const form = {
      /* mock form data */
    };
    const dummyResponse = {
      /* mock response data */
    };

    service.salvarFormulario(form).subscribe((response) => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['_urlApi']}/salvarFormulario`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(
      `Bearer ${service['_token']}`
    );
    expect(req.request.body).toBe(form);
    req.flush(dummyResponse);
  });
});
