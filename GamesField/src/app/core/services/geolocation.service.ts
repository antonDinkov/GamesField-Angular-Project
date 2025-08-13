import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
    getLocation(): Promise<{ lat: number; lng: number }> {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                return resolve({ lat: 0, lng: 0 });
            }
            navigator.geolocation.getCurrentPosition(
                pos => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
                err => resolve({ lat: 0, lng: 0 }) // fallback
            );
        });
    }
}