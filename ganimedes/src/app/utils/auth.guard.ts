import { CanActivateFn } from "@angular/router";
import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = sessionStorage.getItem("token");

  //TODO: Ver se a lógica funciona
  if (token) {
    const obj = JSON.parse(token);
    const now = new Date();
    const exp = new Date(obj.expires);

    if (exp < now) return exp >= now;
  }

  // TODO: mudar para false no futuro e descomentar o router
  // router.navigate(["login"]);
  return true;
};
