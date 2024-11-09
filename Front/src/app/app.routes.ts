import { Routes } from "@angular/router";
import { AuthGuard } from "./utils/AuthGuard";
import { FormularioComponent } from "./components/formulario/formulario.component";
import { HistoricoComponent } from "./components/historico/historico.component";
import { PerfilComponent } from "./components/perfil/perfil.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "formulario",
    // canActivate: [AuthGuard],
    pathMatch: "full",
  }, // TODO: Implementar a verificação de autenticação antes de redirecionar
  { path: "formulario", component: FormularioComponent, providers:  },
  { path: "perfil", component: PerfilComponent },
  { path: "historico", component: HistoricoComponent },
];
