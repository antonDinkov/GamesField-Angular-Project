import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { authFeatureKey, authReducer } from './features/auth/store/auth/auth.reducer';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './features/auth/store/auth/auth.effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { geolocationInterceptor } from './core/interceptors/geolocation-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([geolocationInterceptor])),
    provideAnimations(),
    provideStore({ [authFeatureKey]: authReducer }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
    }),
    provideEffects([AuthEffects]),
  ]
};
