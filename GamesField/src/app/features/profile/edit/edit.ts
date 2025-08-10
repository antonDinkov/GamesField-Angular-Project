import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditProfileFormService } from '../../../core/services/edit-profile.form.service';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';

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
    isUploading: boolean = false;
    user!: User;

    form: FormGroup
    constructor(private location: Location) {
        this.form = this.formService.createProfileForm();
    };

    onSubmit() {
        if (this.isUploading) {
            alert('Please wait until your picture has been uploaded');
            return;
        }

        if (this.formService.isFormInvalid(this.form)) {
            this.formService.markFormTouched(this.form);
            return;
        }

        const oldUserInfo = localStorage.getItem('user');
        let oldEmail = '';
        if (oldUserInfo) {
            oldEmail = JSON.parse(oldUserInfo).email;
        }
        const formContent = this.formService.getProfileFormValue(this.form)
        const payload = {...formContent, oldEmail};

        this.authService.updateUserInfo(payload).subscribe({
            next: (response) => {
                this.user = response;
                localStorage.setItem('user', JSON.stringify(this.user));
                this.router.navigate(['/profile']);
            },
            error: (err) => {
                    console.error('Update failed:', err);
                    this.formService.markFormTouched(this.form)
                }
            
        })
    }

    goBack(): void {
        this.location.back();
    }

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        this.isUploading = true;

        this.formService.uploadPicture(file).subscribe({
            next: (url) => {
                this.form.get('picture')?.setValue(url);
                this.isUploading = false;
            },
            error: (err) => {
                console.error('Upload error:', err);
                this.isUploading = false;
            }
        });
    }
}
