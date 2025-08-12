import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Edit } from './edit';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { GetById } from '../../../core/services/get-by-id';

describe('Edit', () => {
    let component: Edit;
    let fixture: ComponentFixture<Edit>;

    const getByIdMock = {
        getGameById: (id: string) => of({
            post: {
                name: 'Test Game',
                manufacturer: 'Test Manufacturer',
                genre: 'Test Genre',
                instructions: 'Test instructions',
                description: 'Test description',
                image: 'test-image.jpg',
                iframeUrl: 'test-url'
            }
        })
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Edit],
            providers: [provideHttpClient(), provideHttpClientTesting(),
                { provide: GetById, useValue: getByIdMock },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: '1', name: 'Test Game' }),
                    }
                }]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Edit);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
