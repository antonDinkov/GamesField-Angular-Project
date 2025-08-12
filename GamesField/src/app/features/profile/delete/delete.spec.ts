import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Delete } from './delete';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Delete', () => {
  let component: Delete;
  let fixture: ComponentFixture<Delete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Delete],
      providers: [provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Delete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
