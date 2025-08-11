import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
export class HomeItem implements OnInit, OnChanges, OnDestroy {
    @Input() game!: Game;

    ngOnInit(): void {
        console.log('HomeItem initialized with game:', this.game);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['game']) {
            console.log('Game input changed:', changes['game'].currentValue);
        }
    }

    ngOnDestroy(): void {
        console.log('HomeItem component is being destroyed');
    }


    onPushButton(newPlayCount: number): void {
        this.game.played = newPlayCount;
    }
}


