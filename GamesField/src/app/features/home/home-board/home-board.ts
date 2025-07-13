import { Component, OnInit } from '@angular/core';
import { HomeItem } from '../home-item/home-item';
import { TopFiveGamesService } from '../../../core/services/top-five-games.service';
import { Game } from '../../../models/game.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home-board',
    imports: [HomeItem, CommonModule],
    templateUrl: './home-board.html',
    styleUrls: ['./home-board.css']
})
export class HomeBoard implements OnInit {
    topFiveGames: Game[] = [];

    constructor(private topFive: TopFiveGamesService) { }

    ngOnInit(): void {
        this.topFive.getTopFive().subscribe({
            next: (data) => {
                this.topFiveGames = data;
            },
            error: (err) => {
                console.error('Error loading games:', err);
            }
        });
    }
}
