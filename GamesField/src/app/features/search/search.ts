import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../models/game.model';
import { GamesSelection } from '../../core/services/games-selection';
import { HomeItem } from '../home/home-item/home-item';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-search',
    imports: [HomeItem],
    templateUrl: './search.html',
    styleUrls: ['./search.css']
})
export class Search {
    private route = inject(ActivatedRoute);
    private gamesService = inject(GamesSelection);

    // сигнал за съхранение на резултатите
    results = signal<Game[]>([]);
    searchTerm = signal('');
    searchBy = signal<'name' | 'genre'>('name');

    private queryParamsSub!: Subscription;

    constructor() {
        this.queryParamsSub = this.route.queryParams.subscribe(params => {
            const search = params['search'] || '';
            const by = (params['by'] as 'name' | 'genre') || 'name';

            if (search.trim()) {
                this.searchTerm.set(search);
                this.searchBy.set(by);

                this.gamesService.search(search, by).subscribe({
                    next: (games) => this.results.set(games),
                    error: (err) => console.error('Search error:', err)
                });
            } else {
                this.results.set([]);
            }
        });
    }

    ngOnDestroy() {
        if (this.queryParamsSub) {
            this.queryParamsSub.unsubscribe();
        }
    }
}