import {  Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../../models/game.model';

@Injectable({
    providedIn: 'root'
})
export class CreateService {
    private apiUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {}

    create(name: string, manufacturer: string, genre: string, image: string, iframeUrl: string, description: string, instructions: string): Observable<Game>{
        return this.httpClient.post<Game>(`${this.apiUrl}/create`, {name, manufacturer, genre, image, iframeUrl, description, instructions}, { withCredentials: true })
    }
}
