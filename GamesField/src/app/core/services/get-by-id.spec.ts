import { TestBed } from '@angular/core/testing';

import { GetById } from './get-by-id';

describe('GetById', () => {
  let service: GetById;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetById);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
