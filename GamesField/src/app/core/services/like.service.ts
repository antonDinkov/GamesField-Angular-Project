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
    private _views = signal<number | null>(null);
    views$ = this._views.asReadonly();
    private _played = signal<number | null>(null);
    played$ = this._played.asReadonly();
    private _name = signal<string | undefined>('');
    name$ = this._name.asReadonly();
    private _id = signal<string | undefined>('');
    id$ = this._id.asReadonly();

    constructor(private httpClient: HttpClient) {};

    interactWithTheGame(id: string, interaction: string): Observable<Game> {
        const game = this.httpClient.post<Game>(`${this.apiUrl}/catalog/${id}/interact`, { interaction }, {withCredentials: true}).pipe(
            tap (response => {
                this._like.set(response.likes.length);
                this._views.set(response.views);
                this._played.set(response.played);
                this._name.set(response.name);
                this._id.set(response._id);
                
                return response
            })
        )
        return game;
    }

    /* setLastPlayed(id: string, name: string) {
        this._id.set(id);
        this._name.set(name);
    } */
}