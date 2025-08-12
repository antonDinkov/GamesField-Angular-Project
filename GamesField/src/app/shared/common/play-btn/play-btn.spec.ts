import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayBtn } from './play-btn';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('PlayBtn', () => {
  let component: PlayBtn;
  let fixture: ComponentFixture<PlayBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayBtn],
      providers: [provideHttpClient(), provideHttpClientTesting(),
      {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of(convertToParamMap({}))
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayBtn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
