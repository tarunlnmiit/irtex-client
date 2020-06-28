import { TestBed } from '@angular/core/testing';

import { ExplainService } from './explain.service.';

describe('ExplainServiceService', () => {
  let service: ExplainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExplainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
