import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { Navigation } from './shared/navigation/navigation';
import { Filter } from './features/filter/filter';
import { HomeBoard } from './features/home/home-board/home-board';
import { Catalog } from './features/catalog/catalog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Footer, Filter, HomeBoard, Catalog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'GamesField';
}
