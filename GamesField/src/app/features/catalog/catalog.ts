import { Component, OnDestroy, OnInit } from '@angular/core';
import { Game } from '../../models/game.model';
import { GamesSelection } from '../../core/services/games-selection';
import { HomeItem } from '../home/home-item/home-item';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-catalog',
    imports: [HomeItem],
    templateUrl: './catalog.html',
    styleUrl: './catalog.css'
})
export class Catalog implements OnInit, OnDestroy {
    allGames: Game[] = [];
    private gamesSubscription?: Subscription;

    constructor(private games: GamesSelection) { }

    ngOnInit(): void {
        this.gamesSubscription = this.games.getAll().subscribe({
            next: (data) => {
                this.allGames = data;
            },
            error: (err) => {
                console.error('Error loading games:', err);
            }
        });
    }

    ngOnDestroy(): void {
        console.log('Catalog component destroyed');
        this.gamesSubscription?.unsubscribe();
    }
}
