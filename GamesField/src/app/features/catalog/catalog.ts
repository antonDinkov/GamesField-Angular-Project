import { Component, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { GamesSelection } from '../../core/services/games-selection';

@Component({
  selector: 'app-catalog',
  imports: [],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css'
})
export class Catalog implements OnInit {
    allGames: Game[] = [];
    
        constructor(private games: GamesSelection) { }
    
        ngOnInit(): void {
            this.games.getAll().subscribe({
                next: (data) => {
                    this.allGames = data;
                },
                error: (err) => {
                    console.error('Error loading games:', err);
                }
            });
        }
}
