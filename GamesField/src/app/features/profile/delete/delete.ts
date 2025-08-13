import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteService } from '../../../core/services/delete.service';

@Component({
    selector: 'app-delete',
    standalone: true,
    imports: [],
    templateUrl: './delete.html',
    styleUrl: './delete.css'
})
export class Delete implements OnInit {
    private authService = inject(AuthService)
    private delService = inject(DeleteService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (!id) {
            console.error('No profile ID provided');
            this.router.navigate(['/']);
            return;
        }

        // Първо трием профила
        this.delService.deleteProfile(id).subscribe({
            next: () => {
                // После logout
                this.authService.logout().subscribe({
                    next: () => {
                        this.router.navigate(['/']);
                    },
                    error: (err) => {
                        console.error('Error logging out:', err);
                        this.router.navigate(['/']);
                    }
                });
            },
            error: (err) => {
                console.error('Error deleting profile:', err);
                this.router.navigate(['/']);
            }
        });
    }
}
