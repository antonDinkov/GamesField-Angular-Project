import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPage } from './error-page';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('ErrorPage', () => {
    let component: ErrorPage;
    let fixture: ComponentFixture<ErrorPage>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ErrorPage],
            providers: [provideHttpClient(), provideHttpClientTesting(), provideAnimations(), provideAnimationsAsync(),
            {
                provide: ActivatedRoute,
                useValue: {
                    paramMap: of(convertToParamMap({}))
                }
            }]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ErrorPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
