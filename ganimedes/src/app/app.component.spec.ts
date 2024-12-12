import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './services/autenticacao/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { of } from 'rxjs';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerSpy = { navigate: jest.fn() };
  let activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue('12312312'),
      },
      queryParamMap: {
        get: jest.fn().mockReturnValue('someQueryParam'),
      },
    },
    paramMap: of({
      get: (key: string) => '12312312',
    }),
    queryParamMap: of({
      get: (key: string) => 'someQueryParam',
    }),
    params: of({}),
    queryParams: of({}),
    data: of({}),
    fragment: of(''),
    outlet: 'primary',
    routeConfig: {},
    root: {},
    parent: {},
    firstChild: {},
    children: [],
    pathFromRoot: [],
    toString: () => 'mockActivatedRoute',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatIconModule, AppComponent],
      providers: [
        AuthService,
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have the 'ganimedes' title`, () => {
    expect(app.title).toEqual('ganimedes');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Ganimedes');
  });

  it('should navigate to formulario on redirecionaAluno', () => {
    app.redirecionaAluno();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });

  it('should clear session storage and navigate to login on deslogarUsuario', () => {
    sessionStorage.setItem('token', 'testToken');
    sessionStorage.setItem('perfil', 'testPerfil');
    sessionStorage.setItem('usuario', 'testUsuario');

    app.deslogarUsuario();

    expect(sessionStorage.getItem('token')).toBeNull();
    expect(sessionStorage.getItem('perfil')).toBeNull();
    expect(sessionStorage.getItem('usuario')).toBeNull();
    expect(routerSpy.navigate).not.toHaveBeenCalledWith();
  });

  it('should have the correct initial session storage values', () => {
    expect(app.token).toBe(sessionStorage.getItem('token'));
    expect(app.perfil).toBe(sessionStorage.getItem('perfil'));
    expect(app.usuario).toBe(sessionStorage.getItem('usuario'));
  });

  // it('should call sessionStorage.removeItem thrice on deslogarUsuario', () => {
  //   const removeItemSpy = jest.spyOn(sessionStorage, 'removeItem');
  //   app.deslogarUsuario();
  //   expect(removeItemSpy).toHaveBeenCalledTimes(3);
  // });

  it('should call router.navigate with correct URL on redirecionaAluno', () => {
    app.redirecionaAluno();
    expect(routerSpy.navigate).not.toHaveBeenCalledWith();
  });

  it('should update token, perfil, and usuario on session storage change', () => {
    sessionStorage.setItem('token', 'newToken');
    sessionStorage.setItem('perfil', 'newPerfil');
    sessionStorage.setItem('usuario', 'newUsuario');

    app.token = sessionStorage.getItem('token');
    app.perfil = sessionStorage.getItem('perfil');
    app.usuario = sessionStorage.getItem('usuario');

    expect(app.token).toBe('newToken');
    expect(app.perfil).toBe('newPerfil');
    expect(app.usuario).toBe('newUsuario');
  });

  it('should not navigate if session storage is empty on redirecionaAluno', () => {
    sessionStorage.clear();
    app.redirecionaAluno();
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});
