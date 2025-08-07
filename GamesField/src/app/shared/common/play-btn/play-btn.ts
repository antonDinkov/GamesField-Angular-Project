import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Game } from '../../../models/game.model';
import { ActivatedRoute } from '@angular/router';
import { LikeService } from '../../../core/services/like.service';

@Component({
    selector: 'app-play-btn',
    imports: [],
    templateUrl: './play-btn.html',
    styleUrl: './play-btn.css'
})
export class PlayBtn {
    @Input() game!: Game;
    private likeService = inject(LikeService);
    @Output() played = new EventEmitter<number>();

    safeUrl!: string;

    constructor(
        private route: ActivatedRoute,
    ) { }

    startGame() {
        this.likeService.interactWithTheGame(this.game._id, 'played').subscribe(response => {
            this.played.emit(response.played);

        });
        this.safeUrl = this.game.iframeUrl.trim();
        window.open(this.safeUrl, '_blank');
    }
}
