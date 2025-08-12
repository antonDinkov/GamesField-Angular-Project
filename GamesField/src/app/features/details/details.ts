import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetById } from '../../core/services/get-by-id';
import { switchMap } from 'rxjs';
import { Game } from '../../models/game.model';
import { PlayBtn } from '../../shared/common/play-btn/play-btn';
import { LikeService } from '../../core/services/like.service';
import { Location, UpperCasePipe } from '@angular/common';

@Component({
    selector: 'app-details',
    imports: [PlayBtn, RouterLink, UpperCasePipe],
    templateUrl: './details.html',
    styleUrl: './details.css'
})
export class Details implements OnInit {
    isLoggedIn = inject(AuthService).isLoggedIn;
    private gameService = inject(GetById);
    private route = inject(ActivatedRoute);
    id: string = '';
    gameInfo?: Game;
    isAuthor = signal<boolean>(false);
    username?: string;
    hasInteracted?: boolean;
    interactionCount?: number;
    interactorsNames?: string;
    played = signal<number>(0);

    likeService = inject(LikeService);
    likes = this.likeService.like$();

    constructor(private location: Location) {}

    ngOnInit(): void {
        this.route.paramMap.pipe(
            switchMap(params => {
                this.id = params.get('id')!;
                this.likeService.interactWithTheGame(this.id, 'views').subscribe();
                return this.gameService.getGameById(this.id);
            })
        ).subscribe(response => {
            this.gameInfo = response.post;
            this.isAuthor.set(response.isAuthor);
            this.username = response.username;
            this.hasInteracted = response.hasInteracted;
            this.interactionCount = response.interactionCount;
            this.interactorsNames = response.interactorsNames;
            this.played.set(response.post.played);
        });
    }

    onLike () {
        this.likeService.interactWithTheGame(this.id, 'likes').subscribe(response => {
            this.gameInfo = response;
            this.hasInteracted = true;
        });
    }

    onPushButton(newPlayCount: number): void {
        this.played.set(newPlayCount);
    }

    goBack(): void {
        this.location.back();
    }

}
