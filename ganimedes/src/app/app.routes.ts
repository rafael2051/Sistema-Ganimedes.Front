import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { FormularioComponent } from "./components/formulario/formulario.component";
import { PerfilComponent } from "./components/perfil/perfil.component";
import { HistoricoComponent } from "./components/historico/historico.component";
import { authGuard } from "./utils/auth.guard";
import { ListaFormulariosComponent } from "./components/lista-formularios/lista-formularios.component";

export const routes: Routes = [
  // TODO: Implementar a verificação de autenticação antes de redirecionar. Problema com o AuthGuard
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "formulario/:nusp",
    component: FormularioComponent,
    canActivate: [authGuard],
  },
  // TODO: Implementar um authGuard específico para a lista de formulários, pois quem tem acesso depende do perfil - task extra.
  {
    path: "lista",
    component: ListaFormulariosComponent,
    canActivate: [authGuard],
  },
  {
    path: "perfil",
    component: PerfilComponent,
    canActivate: [authGuard],
  },
  {
    path: "historico",
    component: HistoricoComponent,
    canActivate: [authGuard],
  },
  {
    path: "",
    redirectTo: "perfil",
    pathMatch: "full",
  },
];
