import { authReducer, authFeatureKey, AuthState, initialState } from './auth.reducer';
import { AuthActions } from './auth.actions';
import { User } from '../../../../models/user.model';

describe('Auth Reducer', () => {
    it('should set loading to true on login action', () => {
        const action = AuthActions.login({ email: 'test@example.com', password: '123456' });

        const state = authReducer(initialState, action);

        expect(state.loading).toBe(true);
        expect(state.error).toBeNull();
    });

    it('should set user and loading to false on loginSuccess', () => {
        const user: User = {
            _id: '1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            password: '',
            picture: '',
            lastPlayed: '',
            myGames: []
        };
        const action = AuthActions.loginSuccess({ user });

        const state = authReducer(initialState, action);

        expect(state.user).toEqual(user);
        expect(state.loading).toBe(false);
        expect(state.error).toBeNull();
    });

    it('should set error and loading to false on loginFailure', () => {
        const error = 'Invalid credentials';
        const action = AuthActions.loginFailure({ error });

        const state = authReducer(initialState, action);

        expect(state.error).toBe(error);
        expect(state.loading).toBe(false);
    });

    it('should reset state on logout', () => {
        const loggedInState: AuthState = {
            user: {
                _id: '1',
                firstName: 'John',
                lastName: 'Doe',
                email: 'john@example.com',
                password: '',
                picture: '',
                lastPlayed: '',
                myGames: []
            },
            loading: false,
            error: null,
        };

        const action = AuthActions.logout();

        const state = authReducer(loggedInState, action);

        expect(state).toEqual(initialState);
    });
})
