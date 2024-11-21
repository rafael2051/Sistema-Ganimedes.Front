import { CanActivateFn } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem("token");

  // console.log("parametro route", route);
  // console.log("parametro state", state);

  //TODO: Implementar lógica de validação do token
  if (token) {
    const obj = Object.values(token);
    const now = new Date();
    // TODO: Validar para corrigir o erro de TS
    // const exp = new Date(obj["expires"]);

    // return exp >= now;
  }

  return true;
};
