import { TestBed } from '@angular/core/testing';

import { TopFiveGamesService } from './top-five-games.service';

describe('TopFiveGamesService', () => {
  let service: TopFiveGamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopFiveGamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
