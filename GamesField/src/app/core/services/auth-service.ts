import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _isLoggedIn = signal<boolean>(false);
    readonly isLoggedIn = this._isLoggedIn.asReadonly();

    private _user = signal<User | null>(null);
    readonly user = this._user.asReadonly();
    private apiUrl = environment.apiUrl;
    constructor(private httpClient: HttpClient) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            this._user.set(JSON.parse(savedUser));
            this._isLoggedIn.set(true);
        }
    }

    register(firstName: string, lastName: string, email: string, password: string, repass: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/register`, { firstName, lastName, email, password, repass }, { withCredentials: true })
            .pipe(
                tap((user) => {
                    this._isLoggedIn.set(true);
                    this._user.set(user);
                    localStorage.setItem('user', JSON.stringify(user));
                })
            )
    }

    login(email: string, password: string): Observable<User> {
        return this.httpClient.post<User>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
            .pipe(
                tap((user) => {
                    this._isLoggedIn.set(true);
                    this._user.set(user);
                    localStorage.setItem('user', JSON.stringify(user));
                })
            )
    }

    logout() {
        this._user.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('user');
    }
}
