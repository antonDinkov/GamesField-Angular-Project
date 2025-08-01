import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Game } from '../../models/game.model';
import { Observable } from 'rxjs';
import { GameDetailsResponse } from '../../models/gameDetailsResponse.model';

@Injectable({
  providedIn: 'root'
})
export class GetById {
    private apiUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient){}
    getGameById(id:string): Observable<GameDetailsResponse>{
        return this.httpClient.get<GameDetailsResponse>(`${this.apiUrl}/catalog/${id}`, {withCredentials: true});
    }
}
