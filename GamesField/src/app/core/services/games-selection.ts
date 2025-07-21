import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Game } from '../../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GamesSelection {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient){}

  getAll () {
    return this.httpClient.get<Game[]>(`${this.apiUrl}/catalog`);
  }
}
