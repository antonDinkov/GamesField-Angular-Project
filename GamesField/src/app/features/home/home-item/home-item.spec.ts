import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeItem } from './home-item';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';

describe('HomeItem', () => {
    let component: HomeItem;
    let fixture: ComponentFixture<HomeItem>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HomeItem],
            providers: [provideHttpClient(), provideHttpClientTesting(),
            {
                provide: ActivatedRoute,
                useValue: {
                    paramMap: of(convertToParamMap({}))
                }
            }]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HomeItem);
        component = fixture.componentInstance;

        component.game = {
            _id: '1',
            name: 'Test Game',
            image: 'test-image.jpg',
            description: 'Test description',
            played: 5,
            views: 10,
            likes: [],
            instructions: 'Test instructions',
            genre: 'Action',
            manufacturer: 'Test Manufacturer',
            iframeUrl: '',
            owner: 'test-owner-id'
        };

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
