import { Component, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { ActivatedRoute } from '@angular/router';
import { GetById } from '../../core/services/get-by-id';
import { switchMap } from 'rxjs';
import { Game } from '../../models/game.model';

@Component({
    selector: 'app-details',
    imports: [],
    templateUrl: './details.html',
    styleUrl: './details.css'
})
export class Details implements OnInit {
    isLoggedIn = inject(AuthService).isLoggedIn;
    private gameService = inject(GetById);
    private route = inject(ActivatedRoute);
    gameInfo?: Game;
    isAuthor = signal<boolean>(false);
    username?: string;
    hasInteracted?: boolean;
    interactionCount?: number;
    interactorsNames?: string;

    ngOnInit(): void {
        console.log('Details initialation');

        this.route.paramMap.pipe(
            switchMap(params => {
                const id = params.get('id')!;
                return this.gameService.getGameById(id);
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
}
