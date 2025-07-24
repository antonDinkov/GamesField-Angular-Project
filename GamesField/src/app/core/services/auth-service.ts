import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl
    constructor(private httpClient: HttpClient) {}

    register(firstName:string, lastName:string, email: string, password: string, repass: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/register`, {firstName, lastName, email, password, repass})
    }

    login(email: string, password: string){
        this.httpClient.post<User>(`${this.apiUrl}/login`, {email, password})
    }
}
