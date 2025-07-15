import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayBtn } from './play-btn';

describe('PlayBtn', () => {
  let component: PlayBtn;
  let fixture: ComponentFixture<PlayBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayBtn]
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
