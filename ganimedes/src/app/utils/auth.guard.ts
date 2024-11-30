import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem("token");

  if (token) {
    const obj = JSON.parse(token);
    const now = new Date();
    const exp = new Date(obj);

    if (exp < now) router.navigate(["login"]);
    return exp >= now;
  }

  router.navigate(["login"]);
  return false;
};

export const authGuardListaFormularios: CanActivateFn = (route, state) => {
  const perfil = sessionStorage.getItem("perfil");
  return !(state.url === "/lista" && perfil === "Aluno");
};
