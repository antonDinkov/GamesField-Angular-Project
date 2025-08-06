import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Game } from '../../models/game.model';
import { GamesSelection } from '../../core/services/games-selection';

@Component({
  standalone: true,
  selector: 'app-search',
  templateUrl: './search.html', // може да го добавиш по-късно
  imports: [CommonModule],
})
export class Search {
  private route = inject(ActivatedRoute);
  private gamesService = inject(GamesSelection);

  // сигнал за съхранение на резултатите
  results = signal<Game[]>([]);
  searchTerm = signal('');
  searchBy = signal<'name' | 'genre'>('name');

  constructor() {
    // следи query params и прави заявка при промяна
    effect(() => {
      const params = this.route.snapshot.queryParamMap;
      const search = params.get('search') || '';
      const by = (params.get('by') as 'name' | 'genre') || 'name';

      if (search.trim()) {
        this.searchTerm.set(search);
        this.searchBy.set(by);

        this.gamesService.search(search, by).subscribe({
          next: (games) => {
            this.results.set(games);
            console.log(this.results()[0].name);
            
        },
          error: (err) => console.error('Search error:', err)
        });
      }
    });
  }
}