import { Component, Input } from '@angular/core';
import { Game } from '../../../models/game.model';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-play-btn',
    imports: [],
    templateUrl: './play-btn.html',
    styleUrl: './play-btn.css'
})
export class PlayBtn {
    @Input() game!: Game;

    safeUrl!: string;

    constructor(
        private route: ActivatedRoute,
    ) { }

    startGame() {
        this.safeUrl = this.game.iframeUrl.trim();
        window.open(this.safeUrl, '_blank');
    }
}
