import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { guestGuardGuard } from './guest-guard-guard';

describe('guestGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => guestGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [provideHttpClientTesting()]
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
