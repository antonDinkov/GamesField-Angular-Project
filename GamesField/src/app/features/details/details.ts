import { Component, inject, OnInit, output, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GetById } from '../../core/services/get-by-id';
import { switchMap } from 'rxjs';
import { Game } from '../../models/game.model';
import { PlayBtn } from '../../shared/common/play-btn/play-btn';
import { LikeService } from '../../core/services/like.service';

@Component({
    selector: 'app-details',
    imports: [PlayBtn, RouterLink],
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

    likeService = inject(LikeService);
    likes = this.likeService.like$();

    ngOnInit(): void {
        this.route.paramMap.pipe(
            switchMap(params => {
                this.id = params.get('id')!;
                return this.gameService.getGameById(this.id);
            })
        ).subscribe(response => {
            this.gameInfo = response.post;
            this.isAuthor.set(response.isAuthor);
            this.username = response.username;
            this.hasInteracted = response.hasInteracted;
            this.interactionCount = response.interactionCount;
            this.interactorsNames = response.interactorsNames;
        });
    }

    onLike () {
        this.likeService.likeTheGame(this.id).subscribe(response => {
            this.gameInfo = response;
        });
    }
}
