import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditProfileFormService } from '../../../core/services/edit-profile.form.service';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { lastValueFrom } from 'rxjs';

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
            // Ако снимката е премахната локално (празен стринг), изтрий я на бекенда първо
            if (!currentPicture) {
                await lastValueFrom(this.authService.removePicture(oldEmail));
                oldUser.picture = '';
                oldUser.pictureId = '';
                localStorage.setItem('user', JSON.stringify(oldUser));
            }

            // Ако има нов файл, качи го сега (само тук)
            if (this.selectedFile) {
                const uploadResult = await lastValueFrom(this.formService.uploadPicture(this.selectedFile));
                this.form.get('picture')?.setValue(uploadResult.url);

                oldUser.picture = uploadResult.url;
                oldUser.pictureId = uploadResult.publicId;
                localStorage.setItem('user', JSON.stringify(oldUser));
            }

            // След това обнови другите данни, включително и новите picture/pictureId
            const formContent = this.formService.getProfileFormValue(this.form);
            const payload = { ...formContent, oldEmail, pictureId: oldUser.pictureId };

            const updatedUser = await lastValueFrom(this.authService.updateUserInfo(payload));
            this.user = updatedUser;
            localStorage.setItem('user', JSON.stringify(updatedUser));

            this.router.navigate(['/profile']);
        } catch (err) {
            console.error('Update failed:', err);
            this.formService.markFormTouched(this.form);
        }
    }

    goBack(): void {
        this.location.back();
    }

    /* onSubmit() {
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
            console.log(oldEmail);
            
        }
        let pictureId = '';
        if (oldUserInfo) {
            pictureId = JSON.parse(oldUserInfo).pictureId;
            console.log(pictureId);
            
        }
        const formContent = this.formService.getProfileFormValue(this.form)
        const payload = { ...formContent, oldEmail, pictureId };

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
            next: ({ url, publicId }) => {
                this.form.get('picture')?.setValue(url);
                this.isUploading = false;

                const userJson = localStorage.getItem('user');
                if (userJson) {
                    const user = JSON.parse(userJson);
                    user.picture = url;
                    user.pictureId = publicId;
                    localStorage.setItem('user', JSON.stringify(user));
                }

                this.isUploading = false;
            },
            error: (err) => {
                console.error('Upload error:', err);
                this.isUploading = false;
            }
        });
    }

    removePicture() {
        this.form.get('picture')?.setValue('');
        const oldUserInfo = localStorage.getItem('user');
        let email = '';
        if (oldUserInfo) {
            email = JSON.parse(oldUserInfo).email;
        } else {
            throw new Error('Your user information is missing, please contact the support')
        }

        this.authService.removePicture(email).subscribe({
            next: (response) => {
                this.user = response;
                localStorage.setItem('user', JSON.stringify(this.user));
            },
            error: (err) => {
                console.error('Remove picture failed:', err);
                this.formService.markFormTouched(this.form)
            }
        })
    } */
}
