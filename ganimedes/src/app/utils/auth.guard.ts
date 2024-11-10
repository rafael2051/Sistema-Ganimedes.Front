import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token_expires');
  console.log('token auth guard', token);

  sessionStorage.setItem('token_teste', new Date().toDateString());
  console.log(
    'acabei de salvar um token simbolico',
    sessionStorage.getItem('token_teste')
  );

  //TODO: Implementar lógica de validação do token
  if (token) {
    console.log('token existe e acesso bloqueado');
    return false;
  }
  return true;
};
