import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteService } from '../../../core/services/delete.service';

@Component({
    selector: 'app-delete',
    imports: [],
    templateUrl: './delete.html',
    styleUrl: './delete.css'
})
export class Delete implements OnInit {
    message: string = '';
    error: string = '';
    isDeleting = false;

    constructor(
        private deleteService: DeleteService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.isDeleting = true;
            this.deleteService.delete(id).subscribe({
                next: (response) => {
                    this.message = response.message;
                    this.isDeleting = false;
                    this.router.navigate(['/catalog']);
                },
                error: (err) => {
                    this.error = err.error?.message || 'Error deleting the game';
                    this.isDeleting = false;
                }
            });
        } else {
            this.error = 'Invalid ID';
        }
    }
}
