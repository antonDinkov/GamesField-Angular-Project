import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditProfileFormService } from '../../../core/services/edit-profile.form.service';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-edit',
    imports: [ReactiveFormsModule],
    templateUrl: './edit.html',
    styleUrl: './edit.css'
})
export class Edit {
    formService = inject(EditProfileFormService);
    private authService = inject(AuthService);
    private router = inject(Router);

    form: FormGroup
    constructor(private location: Location) {
        this.form = this.formService.createProfileForm();
    };

    onSubmit(){

    }

    goBack(): void {
        this.location.back();
    }

}
