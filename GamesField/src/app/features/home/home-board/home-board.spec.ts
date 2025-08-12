import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBoard } from './home-board';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TopFiveGamesService } from '../../../core/services/top-five-games.service';
import { provideHttpClient } from '@angular/common/http';

describe('HomeBoard', () => {
  let component: HomeBoard;
  let fixture: ComponentFixture<HomeBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeBoard],
      providers: [TopFiveGamesService, provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
