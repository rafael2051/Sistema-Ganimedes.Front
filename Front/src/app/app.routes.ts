import { Routes } from "@angular/router";
import { FormularioComponent } from "./formulario/formulario.component";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "formulario", component: FormularioComponent },
];
