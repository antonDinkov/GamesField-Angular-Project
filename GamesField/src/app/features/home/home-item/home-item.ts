import { Component, Input } from '@angular/core';
import { Game } from '../../../models/game.model';

@Component({
  selector: 'app-home-item',
  standalone: true,
  imports: [],
  templateUrl: './home-item.html',
  styleUrls: ['./home-item.css']
})
export class HomeItem {
    @Input() game!: Game;
}
