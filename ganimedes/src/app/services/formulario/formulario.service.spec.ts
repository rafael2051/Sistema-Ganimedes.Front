import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { FormularioService } from './formulario.service';
import { FormMetaData } from '../../models/formulario.model';

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
    sessionStorage.setItem('token', 'test-token');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch form data', () => {
    const dummyResponse = { data: 'test' };
    service.buscarDadosFormulario('123', '456').subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('https://localhost:7260/getForm/123');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('null');
    expect(req.request.headers.get('Nusp')).toBe('456');
    req.flush(dummyResponse);
  });

  it('should fetch parecer', () => {
    const dummyResponse = { data: 'test' };
    service.buscarParecer(1, 'origem', '456').subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(
      'https://localhost:7260/getParecer/1?origem=origem'
    );
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('test-token');
    expect(req.request.headers.get('Nusp')).toBe('456');
    req.flush(dummyResponse);
  });

  it('should list forms metadata', () => {
    const dummyResponse: FormMetaData[] = [
      {
        id_formulario: 1,
        nusp_luno: '123456',
        nome_aluno: 'John Doe',
        parecer_dado: true,
      },
    ];
    service.listarFormularios('456').subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('https://localhost:7260/getFormsMetadata');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('test-token');
    expect(req.request.headers.get('Nusp')).toBe('456');
    req.flush(dummyResponse);
  });

  it('should save form', () => {
    const dummyResponse = { success: true };
    const form = {
      artigosEscrita: '1',
      artigosSubmetidos: '2',
      artigosAceitos: '3',
      aprovacoesDesdeInicio: '4',
      reprovacoesSemestreAtual: '5',
      reprovacoesDesdeInicio: '6',
      atividadesAcademicas: 'test',
      atividadesPesquisa: 'test',
      declaracaoCCP: 'test',
      dificuldades: '1',
      conceitosDivulgados: '1',
    };
    service.salvarFormulario('ALUNO', form, '123', '456').subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('https://localhost:7260/postFormulario');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('test-token');
    req.flush(dummyResponse);
  });

  it('should save parecer', () => {
    const dummyResponse = { success: true };
    const form = { parecer: 'test', conceito: '1' };
    service.salvarParecer(1, form, '456', 'perfil').subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('https://localhost:7260/postParecer');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe('test-token');
    expect(req.request.headers.get('Nusp')).toBe('456');
    req.flush(dummyResponse);
  });

  it('should update form', () => {
    const dummyResponse = { success: true };
    const form = {
      artigosEscrita: '1',
      artigosSubmetidos: '2',
      artigosAceitos: '3',
      aprovacoesDesdeInicio: '4',
      reprovacoesSemestreAtual: '5',
      reprovacoesDesdeInicio: '6',
      atividadesAcademicas: 'test',
      atividadesPesquisa: 'test',
      declaracaoCCP: 'test',
      dificuldades: '1',
      conceitosDivulgados: '1',
    };
    service.atualizarFormulario(form, '123', '456').subscribe((res) => {
      expect(res).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne('https://localhost:7260/updateFormulario');
    expect(req.request.method).toBe('PUT');
    expect(req.request.headers.get('Authorization')).toBe('test-token');
    req.flush(dummyResponse);
  });
});
