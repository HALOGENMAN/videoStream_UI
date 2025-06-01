import { TestBed } from '@angular/core/testing';

import { LoadConfigsService } from './load-configs.service';

describe('LoadConfigsService', () => {
  let service: LoadConfigsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadConfigsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
