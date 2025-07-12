import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './shared/footer/footer';
import { Navigation } from './shared/navigation/navigation';
import { Home } from './features/home/home';
import { Filter } from './features/filter/filter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navigation, Footer, Filter, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'GamesField';
}
