import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token_expires');
  console.log('token auth guard', token);

  sessionStorage.setItem('token_expires', new Date().toDateString());
  console.log(
    'acabei de salvar um token simbolico',
    sessionStorage.getItem('token_expires')
  );

  //TODO: Implementar lógica de validação do token
  if (token) {
    return false;
  }
  return true;
};
