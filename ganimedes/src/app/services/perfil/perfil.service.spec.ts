import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PerfilService } from './perfil.service';

describe('PerfilService', () => {
  let service: PerfilService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PerfilService],
    });
    service = TestBed.inject(PerfilService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call salvarPerfil with correct URL and headers', () => {
    const dummyPerfil = { name: 'John Doe' };
    const token = 'dummy-token';
    sessionStorage.setItem('token', token);

    service.salvarPerfil(dummyPerfil).subscribe();

    const req = httpMock.expectOne(
      'http://localhost:5000/perfil/atualizarPerfil'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush({});
  });

  it('should handle error response in salvarPerfil', () => {
    const dummyPerfil = { name: 'John Doe' };
    const token = 'dummy-token';
    sessionStorage.setItem('token', token);

    service.salvarPerfil(dummyPerfil).subscribe();

    const req = httpMock.expectOne(
      'http://localhost:5000/perfil/atualizarPerfil'
    );
    expect(req.request.method).toBe('POST');
    req.flush('Error', { status: 500, statusText: 'Server Error' });
  });
});
