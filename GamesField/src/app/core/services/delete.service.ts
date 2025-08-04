import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Delete } from '../../models/delete.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DeleteService {
    private apiUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {};

    delete(id: string): Observable<Delete> {
        const url = `${this.apiUrl}/catalog/${id}`;
        return this.httpClient.delete<Delete>(url, {withCredentials: true});
    }
}
