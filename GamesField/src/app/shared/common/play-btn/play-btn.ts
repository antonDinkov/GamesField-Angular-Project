import { Component, Input } from '@angular/core';
import { Game } from '../../../models/game.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play-btn',
  imports: [],
  templateUrl: './play-btn.html',
  styleUrl: './play-btn.css'
})
export class PlayBtn {
    @Input() game!: Game;

    constructor(private router: Router){}

    startGame(){
        this.router.navigate(['/play', this.game._id])
    }
}
