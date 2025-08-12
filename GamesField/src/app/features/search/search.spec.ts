import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Search } from './search';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { GamesSelection } from '../../core/services/games-selection';

describe('Search', () => {
    let component: Search;
    let fixture: ComponentFixture<Search>;

    const gamesSelectionMock = {
        search: (search: string, by: 'name' | 'genre') => of([]) // връща празен observable
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Search],
            providers: [provideHttpClient(), provideHttpClientTesting(),
            {
                provide: ActivatedRoute,
                useValue: {
                    queryParams: of({ search: '', by: 'name' })
                }
            },
            {
                provide: GamesSelection,
                useValue: gamesSelectionMock
            }]
        })
            .compileComponents();

        fixture = TestBed.createComponent(Search);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
