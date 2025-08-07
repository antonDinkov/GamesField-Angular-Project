import { Component, Input } from '@angular/core';
import { Game } from '../../../models/game.model';
import { PlayBtn } from '../../../shared/common/play-btn/play-btn';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home-item',
    standalone: true,
    imports: [PlayBtn, RouterModule],
    templateUrl: './home-item.html',
    styleUrls: ['./home-item.css']
})
export class HomeItem {
    @Input() game!: Game;

    onPushButton(newPlayCount: number): void {
        this.game.played = newPlayCount;
    }
}


