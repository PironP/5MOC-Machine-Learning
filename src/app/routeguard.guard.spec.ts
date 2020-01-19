import { TestBed, async, inject } from '@angular/core/testing';

import { Routeguard } from './routeguard.guard';

describe('RouteguardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Routeguard]
    });
  });

  it('should ...', inject([Routeguard], (guard: Routeguard) => {
    expect(guard).toBeTruthy();
  }));
});
