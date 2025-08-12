import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';
import { User } from '../../../../models/user.model';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,

  // Започва логин -> вдига loading, чисти error
  on(AuthActions.login, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Логин успешен -> вдига user, маха loading, чисти error
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null,
  })),

  // Логин грешка -> маха loading, записва грешката
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  // Logout -> чисти user и грешки
  on(AuthActions.logout, (state) => ({
    ...state,
    user: null,
    error: null,
  }))
);