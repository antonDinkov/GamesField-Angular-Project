import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Filter } from './filter';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('Filter', () => {
  let component: Filter;
  let fixture: ComponentFixture<Filter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filter],
      providers: [provideHttpClient(), provideHttpClientTesting(),
      {
        provide: ActivatedRoute,
        useValue: {
          paramMap: of(convertToParamMap({ id: '123' }))
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Filter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
