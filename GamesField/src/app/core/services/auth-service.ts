import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';
import { map, Observable, tap } from 'rxjs';
import { getCookie } from '../../shared/utils/cookie.util';

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
        this.checkSession().subscribe({
            next: (user) => {
                this._user.set(user);
                this._isLoggedIn.set(true);
            },
            error: () => {
                localStorage.removeItem('user');
                this._user.set(null);
                this._isLoggedIn.set(false);
            }
        });
    }

    register(firstName: string, lastName: string, email: string, password: string, repass: string): Observable<User> {
        return this.httpClient.post<{ message: string, user: User }>(`${this.apiUrl}/register`, { firstName, lastName, email, password, repass }, { withCredentials: true })
            .pipe(
                tap((response) => {
                    this._isLoggedIn.set(true);
                    this._user.set(response.user);
                    localStorage.setItem('user', JSON.stringify(response.user));
                }),
                map(response => response.user)
            )
    }

    login(email: string, password: string): Observable<{message: string, user: User}> {
        return this.httpClient.post<{ message: string, user: User }>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
            .pipe(
                tap((response) => {
                    this._isLoggedIn.set(true);
                    this._user.set(response.user);
                    localStorage.setItem('user', JSON.stringify(response.user));
                }))
    }

    logout(): Observable<{ message: string }> {
        return this.httpClient.get<{ message: string }>(`${this.apiUrl}/logout`, { withCredentials: true })
            .pipe(
                tap(() => {
                    this._isLoggedIn.set(false);
                    this._user.set(null);
                    localStorage.removeItem('user');
                })
            );
    }

    checkSession(): Observable<User> {
        return this.httpClient.get<{ user: User }>(`${this.apiUrl}/me`, { withCredentials: true })
            .pipe(
                map(response => response.user)
            );
    }
}
