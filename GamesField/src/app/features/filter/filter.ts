import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { LikeService } from '../../core/services/like.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { GetById } from '../../core/services/get-by-id';
import { GameDetailsResponse } from '../../models/gameDetailsResponse.model';

@Component({
    selector: 'app-filter',
    imports: [RouterLink, AsyncPipe],
    templateUrl: './filter.html',
    styleUrl: './filter.css'
})
export class Filter implements OnInit {
    authservice = inject(AuthService);
    service = inject(LikeService);
    gameService = inject(GetById);
    isLoggedIn: boolean = false;
    gameName: string = '';
    gameId: string | null = null;
    userId: string | undefined = '';

    ngOnInit(): void {
        this.authservice.checkSession().subscribe(user => {
            this.isLoggedIn = true;
            if (user.lastPlayed) {
                this.gameService.getGameById(user.lastPlayed).subscribe(game => {
                    this.authservice.setLastPlayed(game.post._id, game.post.name);
                });
            }
        });

        // Следим за промени в lastPlayed
        this.authservice.lastPlayed$.subscribe(lastPlayed => {
            if (lastPlayed) {
                this.gameId = lastPlayed.id;
                this.gameName = lastPlayed.name;
            }
        });
    }

    loadLastPlayed() {
        this.authservice.checkSession().subscribe({
            next: (response) => {
                this.gameId = response.lastPlayed;
                if (this.gameId) {
                    this.gameService.getGameById(this.gameId).subscribe((game) => {
                        this.gameName = game.post.name;
                    });
                }
            },
            error: (err) => console.error(err)
        });
    }
}
