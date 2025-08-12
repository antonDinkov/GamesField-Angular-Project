import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Create } from './create';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('Create', () => {
  let component: Create;
  let fixture: ComponentFixture<Create>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Create],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Create);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
