import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LoginResponse } from '../../models/loginResponse.model';
import { Aluno, Usuario } from '../../models/usuario.model';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user', () => {
    const mockUsuario: Usuario = {
      nomeCompleto: 'Test User',
      nusp: '654321',
      email: 'testuser@example.com',
      linkLattes: 'http://lattes.cnpq.br/6543210987654321',
      perfil: 'Docente',
    };
    const mockAluno = new Aluno(
      'Test Student',
      '123456',
      'student@example.com',
      'http://lattes.cnpq.br/1234567890123456',
      'Aluno',
      'Mestrado',
      2021,
      'Aprovado',
      'Não Realizado',
      new Date('2023-12-31'),
      new Date('2025-12-31'),
      'Dr. Orientador',
      '123456789',
      new Date('1995-01-01'),
      'Brasileiro'
    );
    const mockResponse: LoginResponse = {
      token: '12345',
      expiration_date: new Date('2023-12-31T23:59:59'),
      user_data: mockUsuario,
      student_data: mockAluno,
    };

    const form = { email: 'test@example.com', senha: 'password' };

    service.login(form).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: form.email,
      password: form.senha,
    });
    req.flush(mockResponse);
  });

  it('should sign up user', () => {
    const form = { email: 'test@example.com', senha: 'password' };

    service.signUpUser(form).subscribe((response) => {
      expect(response).toBe(true);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/registerUser`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(form);
    req.flush(true);
  });

  it('should sign up student', () => {
    const form = { email: 'student@example.com', senha: 'password' };

    service.signUpStudent(form).subscribe((response) => {
      expect(response).toBe(true);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/registerStudent`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(form);
    req.flush(true);
  });
});
