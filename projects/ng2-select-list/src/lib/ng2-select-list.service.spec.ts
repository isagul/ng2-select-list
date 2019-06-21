import { TestBed } from '@angular/core/testing';

import { Ng2SelectListService } from './ng2-select-list.service';

describe('Ng2SelectListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Ng2SelectListService = TestBed.get(Ng2SelectListService);
    expect(service).toBeTruthy();
  });
});
