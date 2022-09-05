import { TestBed } from '@angular/core/testing';

import { UploadIMGService } from './upload-img.service';

describe('UploadIMGService', () => {
  let service: UploadIMGService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadIMGService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
