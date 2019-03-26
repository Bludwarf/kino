import { TestBed } from '@angular/core/testing';

import { BenevoleService } from './benevole.service';

describe('BenevoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BenevoleService = TestBed.get(BenevoleService);
    expect(service).toBeTruthy();
  });
});
