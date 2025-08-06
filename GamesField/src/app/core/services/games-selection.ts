import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Game } from '../../models/game.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GamesSelection {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient){}

  getAll (): Observable<Game[]> {
    return this.httpClient.get<Game[]>(`${this.apiUrl}/catalog`);
  }
  search(searchTerm: string, by: 'name' | 'genre'): Observable<Game[]> {
  const params = {
    search: searchTerm,
    by
  };

  return this.httpClient.get<{ result: Game[] }>(`${this.apiUrl}/search`, { params })
    .pipe(
      map(response => response.result)
    );
}
}
