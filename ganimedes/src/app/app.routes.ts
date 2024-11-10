import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormularioComponent } from './components/formulario/formulario.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { authGuard } from './utils/auth.guard';

export const routes: Routes = [
  // TODO: Implementar a verificação de autenticação antes de redirecionar. Problema com o AuthGuard
  { path: 'login', component: LoginComponent },
  {
    path: 'formulario',
    component: FormularioComponent,
    canActivate: [authGuard],
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [authGuard],
  },
  {
    path: 'historico',
    component: HistoricoComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'formulario',
    pathMatch: 'full',
  },
];
