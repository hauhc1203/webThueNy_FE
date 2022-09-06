import { TestBed } from '@angular/core/testing';

import { ProvideServiceService } from './provide-service.service';

describe('ProvideServiceService', () => {
  let service: ProvideServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProvideServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
