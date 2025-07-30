import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _isLoggedIn = signal<boolean>(false);
    readonly isLoggedIn = this._isLoggedIn.asReadonly();

    private _user = signal<User | null>(null);
    readonly user = this._user.asReadonly();
    private apiUrl = environment.apiUrl
    constructor(private httpClient: HttpClient) {}

    register(firstName:string, lastName:string, email: string, password: string, repass: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/register`, {firstName, lastName, email, password, repass})
    }

    login(email: string, password: string){
        this.httpClient.post<User>(`${this.apiUrl}/login`, {email, password})
    }
}
