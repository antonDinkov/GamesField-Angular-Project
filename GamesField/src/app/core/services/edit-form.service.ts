import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../../models/game.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EditFormService {
    private apiUrl = environment.apiUrl
    constructor(private httpClient: HttpClient) {};
    
    edit(id: string, name: string, manufacturer: string, genre: string, image: string, iframeUrl: string, description: string, instructions: string): Observable<{message: string, game: Game}>{
        return this.httpClient.post<{message: string, game: Game}>(`${this.apiUrl}/catalog/${id}/edit`, {name, manufacturer, genre, image, iframeUrl, description, instructions}, {withCredentials: true});
    }
}
