import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastPlayed } from './last-played';

describe('LastPlayed', () => {
  let component: LastPlayed;
  let fixture: ComponentFixture<LastPlayed>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastPlayed]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastPlayed);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
