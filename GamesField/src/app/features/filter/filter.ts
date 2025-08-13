import { Component, Inject, inject, OnInit } from '@angular/core';
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
    isLoggedIn = this.authservice.isLoggedIn;
    gameName: string = '';
    gameId: string | null = null;
    userId: string | undefined = '';
    lastPlayed: { id: string; name: string } | null = null;

    ngOnInit(): void {
        this.authservice.lastPlayed$.subscribe(value => {
            this.lastPlayed = value;
            if (value) {
                this.gameId = value.id;
                this.gameName = value.name;
            }
        });
    }



    /* loadLastPlayed() {
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
    } */
}
