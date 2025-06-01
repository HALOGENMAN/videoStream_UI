import { TestBed } from '@angular/core/testing';

import { LoadLablesService } from './load-lables.service';

describe('LoadLablesService', () => {
  let service: LoadLablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadLablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
