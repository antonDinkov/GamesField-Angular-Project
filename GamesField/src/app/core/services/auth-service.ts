import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { getCookie } from '../../shared/utils/cookie.util';
import { GetById } from './get-by-id';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _isLoggedIn = signal<boolean>(false);
    readonly isLoggedIn = this._isLoggedIn.asReadonly();
    lastPlayed$ = new BehaviorSubject<{ id: string, name: string } | null>(null);
    private _user = signal<User | null>(null);
    readonly user = this._user.asReadonly();
    private apiUrl = environment.apiUrl;
    gameService = inject(GetById)

    constructor(private httpClient: HttpClient) {
        this.checkSession().subscribe({
            next: (user) => {
                this._user.set(user);
                this._isLoggedIn.set(true);
                if (user.lastPlayed) {
                    // Зареждаме Last Played веднага
                    this.gameService.getGameById(user.lastPlayed).subscribe(game => {
                        this.setLastPlayed(game.post._id, game.post.name);
                    });
                }
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

    login(email: string, password: string): Observable<{ message: string, user: User }> {
        return this.httpClient.post<{ message: string, user: User }>(`${this.apiUrl}/login`, { email, password }, { withCredentials: true })
            .pipe(
                tap((response) => {
                    this._isLoggedIn.set(true);
                    this._user.set(response.user);
                    localStorage.setItem('user', JSON.stringify(response.user));

                    if (response.user.lastPlayed) {
                        // Зареждаме LastPlayed веднага
                        this.gameService.getGameById(response.user.lastPlayed).subscribe(game => {
                            this.setLastPlayed(game.post._id, game.post.name);
                        });
                    } else {
                        this.lastPlayed$.next(null);
                    }
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

    updateUserInfo(payload: {}): Observable<User> {
        return this.httpClient.put<{ user: User }>(`${this.apiUrl}/update/profile`, payload, { withCredentials: true })
            .pipe(
                map(response => response.user)
            );
    }

    removePicture(email: string): Observable<User> {
        return this.httpClient
            .put<{ user: User }>(
                `${this.apiUrl}/update/profile/remove-picture`,
                { email },
                { withCredentials: true }
            )
            .pipe(map(response => response.user));
    }



    setLastPlayed(gameId: string, gameName: string) {
        this.lastPlayed$.next({ id: gameId, name: gameName });
    }
}