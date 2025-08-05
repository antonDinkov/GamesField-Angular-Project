import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { Game } from '../../models/game.model';

@Injectable({
    providedIn: 'root'
})
export class LikeService {
    private apiUrl = environment.apiUrl
    private _like = signal<number | null>(null);
    like$ = this._like.asReadonly();
    
    constructor(private httpClient: HttpClient) {};

    likeTheGame(id: string): Observable<Game> {
        const game = this.httpClient.get<Game>(`${this.apiUrl}/catalog/${id}/interact`, {withCredentials: true}).pipe(
            tap (response => {
                this._like.set(response.likes.length);
                return response
            })
        )
        return game;
    }
}