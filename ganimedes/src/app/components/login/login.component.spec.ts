import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/autenticacao/auth.service';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      login: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should save user data', () => {
  //   jest.spyOn(sessionStorage, 'setItem');
  //   const dadosUsuario = {
  //     token: 'testToken',
  //     validade: 'testValidity',
  //     perfil: 'testProfile',
  //     usuario: 'testUser',
  //   };
  //   component.salvarDados(dadosUsuario);
  //   expect(sessionStorage.setItem).toHaveBeenCalledWith('token', 'testToken');
  //   expect(sessionStorage.setItem).toHaveBeenCalledWith(
  //     'exp_tolen',
  //     'testValidity'
  //   );
  //   expect(sessionStorage.setItem).toHaveBeenCalledWith(
  //     'perfil',
  //     'testProfile'
  //   );
  //   expect(sessionStorage.setItem).toHaveBeenCalledWith(
  //     'usuario',
  //     JSON.stringify(dadosUsuario)
  //   );
  // });

  it('should login successfully', () => {
    const response = {
      token: 'testToken',
      validade: 'testValidity',
      perfil: 'testProfile',
      usuario: 'testUser',
    };
    authServiceMock.login.mockReturnValue(of(response));
    jest.spyOn(component, 'salvarDados');
    component.login();
    expect(authServiceMock.login).toHaveBeenCalledWith(component.form.value);
    expect(component.salvarDados).toHaveBeenCalledWith(response);
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should handle login error', () => {
    authServiceMock.login.mockReturnValue(
      throwError(() => new Error('Invalid credentials'))
    );
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    component.login();
    expect(authServiceMock.login).toHaveBeenCalledWith(component.form.value);
    expect(window.alert).toHaveBeenCalledWith('Usuário ou senha inválidos');
  });

  it('should navigate to sign up', () => {
    component.signUp();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/cadastro']);
  });
});
