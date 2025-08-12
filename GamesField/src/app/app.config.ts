import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { authFeatureKey, authReducer } from './features/auth/store/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './features/auth/store/auth/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
    provideStore({ [authFeatureKey]: authReducer }),
    provideEffects(AuthEffects)
  ]
};
