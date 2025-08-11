import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditProfileFormService } from '../../../core/services/edit-profile.form.service';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { lastValueFrom } from 'rxjs';
import { BackendError } from '../../../models/beckendError.model';

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

    public errorToShow: BackendError | null = null;

    selectedFile: File | null = null;
    isUploading: boolean = false;
    user!: User;

    form: FormGroup
    constructor(private location: Location) {
        this.form = this.formService.createProfileForm();
    };

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            // Вземи base64 url и го сложи в form.control за picture (за preview)
            this.form.get('picture')?.setValue(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Запази файла локално за upload по-късно при submit
        this.selectedFile = file;
    }

    removePicture() {
        this.form.get('picture')?.setValue('');
        this.selectedFile = null;

        // Махаш и от localStorage, за да не показва старото
        const userJson = localStorage.getItem('user');
        if (userJson) {
            const user = JSON.parse(userJson);
            user.picture = '';
            user.pictureId = '';
            localStorage.setItem('user', JSON.stringify(user));
        }
    }

    async onSubmit() {
        if (this.isUploading) {
            alert('Please wait until your picture has been uploaded');
            return;
        }

        if (this.formService.isFormInvalid(this.form)) {
            this.formService.markFormTouched(this.form);
            return;
        }

        const oldUserInfo = localStorage.getItem('user');
        if (!oldUserInfo) {
            alert('Your user information is missing, please contact support');
            return;
        }

        const oldUser = JSON.parse(oldUserInfo);
        const oldEmail = oldUser.email;
        const currentPicture = this.form.get('picture')?.value;

        try {
            if (!currentPicture) {
                await lastValueFrom(this.authService.removePicture(oldEmail));
                oldUser.picture = '';
                oldUser.pictureId = '';
                localStorage.setItem('user', JSON.stringify(oldUser));
            }

            if (this.selectedFile) {
                const uploadResult = await lastValueFrom(this.formService.uploadPicture(this.selectedFile));
                this.form.get('picture')?.setValue(uploadResult.url);

                oldUser.picture = uploadResult.url;
                oldUser.pictureId = uploadResult.publicId;
                localStorage.setItem('user', JSON.stringify(oldUser));
            }

            const formContent = this.formService.getProfileFormValue(this.form);
            const payload = { ...formContent, oldEmail, pictureId: oldUser.pictureId };

            const updatedUser = await lastValueFrom(this.authService.updateUserInfo(payload));
            this.user = updatedUser;
            localStorage.setItem('user', JSON.stringify(updatedUser));

            this.router.navigate(['/profile']);
        } catch (err: any) {
            console.error('Update failed:', err);

            const backendErrors = err.error?.errors;

                    if (typeof backendErrors === 'string') {
                        this.errorToShow = { message: backendErrors };
                    } else if (Array.isArray(backendErrors)) {
                        this.errorToShow = { message: backendErrors.join(', ') };
                    } else if (typeof backendErrors === 'object' && backendErrors !== null) {
                        this.errorToShow = { message: Object.values(backendErrors).join(', ') };
                    } else {
                        this.errorToShow = { message: 'Unexpected error occurred' };
                    }

            this.formService.markFormTouched(this.form);
        }
    }

    goBack(): void {
        this.location.back();
    }

}
