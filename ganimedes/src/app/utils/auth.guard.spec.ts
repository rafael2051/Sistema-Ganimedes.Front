import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth.guard';
import { authGuardLogin } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
describe('authGuardLogin', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuardLogin(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    sessionStorage.clear();
  });

  it('should return true if expire_date is not set', () => {
    expect(executeGuard({} as any, { url: '' } as any)).toBe(true);
  });

  it('should return true if expire_date is in the future', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 1);
    sessionStorage.setItem('expire_date', futureDate.toISOString());

    expect(executeGuard({} as any, { url: '' } as any)).toBe(true);
  });

  it('should return false if expire_date is in the past', () => {
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);
    sessionStorage.setItem('expire_date', pastDate.toISOString());

    expect(executeGuard({} as any, { url: '' } as any)).toBe(false);
  });
});
