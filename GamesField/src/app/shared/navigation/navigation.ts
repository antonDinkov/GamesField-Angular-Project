import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-navigation',
    imports: [RouterModule, RouterLink, ReactiveFormsModule],
    templateUrl: './navigation.html',
    styleUrl: './navigation.css'
})
export class Navigation {
    isLoggedIn = inject(AuthService).isLoggedIn;

    private fb = inject(FormBuilder);
    private router = inject(Router);

    searchForm: FormGroup = this.fb.group({
        search: [''],
        searchBy: ['name']
    });

    onSearch() {
        const { search, searchBy } = this.searchForm.value;

        if (!search?.trim()) return;

        this.router.navigate(['/search'], {
            queryParams: {
                search,
                by: searchBy
            }
        });
    }
}
