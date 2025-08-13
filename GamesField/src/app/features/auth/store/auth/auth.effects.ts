import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthActions } from './auth.actions';

import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../../../../core/services/auth-service';
import { Router } from '@angular/router';
import { LikeService } from '../../../../core/services/like.service';


/* @Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private likeService = inject(LikeService);
    private router = inject(Router);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ email, password }) =>
                this.authService.login(email, password).pipe(
                    map((response) => AuthActions.loginSuccess({ user: response.user })),
                    catchError((error) => {
                        let message = 'Unexpected error occurred';
                        const backendErrors = error.error?.errors;
                        if (typeof backendErrors === 'string') {
                            message = backendErrors;
                        } else if (Array.isArray(backendErrors)) {
                            message = backendErrors.join(', ');
                        } else if (typeof backendErrors === 'object' && backendErrors !== null) {
                            message = Object.values(backendErrors).join(', ');
                        }
                        return of(AuthActions.loginFailure({ error: message }));
                    })
                )
            )
        )
    );

    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginSuccess),
                tap(({ user }) => {
                    // Навигация
                    this.router.navigate(['/']);

                    // Задаване на Last Played ако има
                    if (user?.lastPlayed) {
                        this.likeService.setLastPlayed(user.lastPlayed, ''); // вторият параметър остава празен
                    }
                })
            ),
        { dispatch: false }
    );
} */

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService)
    private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(response => AuthActions.loginSuccess({ user: response.user })),
          catchError(error => {
            let message = 'Unexpected error occurred';
            const backendErrors = error.error?.errors;
            if (typeof backendErrors === 'string') {
              message = backendErrors;
            } else if (Array.isArray(backendErrors)) {
              message = backendErrors.join(', ');
            } else if (typeof backendErrors === 'object' && backendErrors !== null) {
              message = Object.values(backendErrors).join(', ');
            }
            return of(AuthActions.loginFailure({ error: message }));
          })
        )
      )
    )
  );

  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(() => this.router.navigate(['/']))
    ),
    { dispatch: false }
  );
}