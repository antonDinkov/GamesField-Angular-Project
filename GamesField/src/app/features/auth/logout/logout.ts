import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-logout',
    imports: [],
    templateUrl: './logout.html',
    styleUrl: './logout.css'
})
export class Logout implements OnInit, OnDestroy {
    private router = inject(Router);
    private authService = inject(AuthService);

    private logoutSubscription?: Subscription;

    ngOnInit(): void {
        this.logoutSubscription = this.authService.logout().subscribe({
            next: () => this.router.navigate(['/']),
            error: (err) => {
                console.error('Logout error', err);
                this.router.navigate(['/']);
            }
        })
    }

    ngOnDestroy() {
        if (this.logoutSubscription) {
            this.logoutSubscription.unsubscribe();
            console.log('Logout request cancelled due to component destroy');
        }
    }

}
