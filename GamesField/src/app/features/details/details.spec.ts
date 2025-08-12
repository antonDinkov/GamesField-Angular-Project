import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Details } from './details';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth-service';
import { GetById } from '../../core/services/get-by-id';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('Details', () => {
  let component: Details;
  let fixture: ComponentFixture<Details>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Details],
      providers: [AuthService, GetById, provideHttpClient(), provideHttpClientTesting(),
      {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of(convertToParamMap({ id: '123' }))  // пробвай с някакъв id
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Details);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
