import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { FormularioComponent } from "./components/formulario/formulario.component";
import { PerfilComponent } from "./components/perfil/perfil.component";
import { authGuard, authGuardListaFormularios } from "./utils/auth.guard";
import { ListaFormulariosComponent } from "./components/lista-formularios/lista-formularios.component";
import { CadastroComponent } from "./components/cadastro/cadastro.component";

export const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "cadastro",
    component: CadastroComponent,
  },
  {
    path: "formulario/:nusp",
    component: FormularioComponent,
    canActivate: [authGuard],
  },
  {
    path: "lista",
    component: ListaFormulariosComponent,
    canActivate: [authGuard, authGuardListaFormularios],
  },
  {
    path: "perfil",
    component: PerfilComponent,
    canActivate: [authGuard],
  },
  {
    path: "",
    redirectTo: "perfil",
    pathMatch: "full",
  },
];
