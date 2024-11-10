import { Routes } from '@angular/router';
import { FormularioComponent } from './components/formulario/formulario.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { AuthGuard } from './utils/AuthGuard';

export const routes: Routes = [
  // TODO: Implementar a verificação de autenticação antes de redirecionar. Problema com o AuthGuard
  { path: 'login', component: LoginComponent },
  {
    path: 'formulario',
    component: FormularioComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'historico',
    component: HistoricoComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'formulario',
    pathMatch: 'full',
  },
];
