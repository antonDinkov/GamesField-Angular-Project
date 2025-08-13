import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { GeolocationService } from '../services/geolocation.service';
import { from, mergeMap } from 'rxjs';

export const geolocationInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  
  if (!req.url.endsWith('/login') && !req.url.endsWith('/register')) {
    return next(req);
  }

  const geoService = inject(GeolocationService);

  return from(geoService.getLocation()).pipe(
    mergeMap(location => {
      const clonedReq = req.clone({
        setHeaders: {
          'X-User-Lat': location.lat.toString(),
          'X-User-Lng': location.lng.toString()
        }
      });
      return next(clonedReq);
    })
  );
};
