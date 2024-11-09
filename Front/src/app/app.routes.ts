import { Routes } from "@angular/router";
import { FormularioComponent } from "./formulario/formulario.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { HistoricoComponent } from "./historico/historico.component";

export const routes: Routes = [
  { path: "", redirectTo: "formulario", pathMatch: "full" }, // TODO: Implementar a verificação de autenticação antes de redirecionar
  { path: "formulario", component: FormularioComponent },
  { path: "perfil", component: PerfilComponent },
  { path: "historico", component: HistoricoComponent },
];
