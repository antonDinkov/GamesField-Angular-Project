import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EditProfileFormService {
    private formBuilder = inject(FormBuilder);
    private httpClient = inject(HttpClient);

    private CLOUD_NAME = 'dsqegonee';
    private UPLOAD_PRESET = 'my_unsigned_preset';

    createProfileForm(): FormGroup {
        const storedUser = localStorage.getItem('user');
        const userInfo = storedUser ? JSON.parse(storedUser) : '';
        const email = userInfo.email;
        const first = userInfo.firstName;
        const last = userInfo.lastName;
        return this.formBuilder.group({
            firstName: [first, [Validators.required, Validators.minLength(4)]],
            lastName: [last, [Validators.required, Validators.minLength(4)]],
            email: [email, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
                repass: ['', [Validators.required]],
            }, { validators: this.passwordMatchValidator }),
            picture: ['']
        })
    }

    uploadPicture(file: File): Observable<string> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', this.UPLOAD_PRESET);

        return this.httpClient.post<{ secure_url: string }>(
            `https://api.cloudinary.com/v1_1/${this.CLOUD_NAME}/image/upload`,
            formData
        ).pipe(
            map(res => res.secure_url)
        );
    }

    getNestedControl(form: FormGroup, groupName: string, controlName: string) {
        return (form.get(groupName) as FormGroup)?.get(controlName);
    }

    private passwordMatchValidator(passwordsControl: AbstractControl): ValidationErrors | null {
        const password = passwordsControl.get('password');
        const repass = passwordsControl.get('repass');

        if (!password || !repass) return null;

        const mismatch = password.value !== repass.value;

        if (mismatch) {
            repass.setErrors({ passwordMismatch: true }); // ✅ задаваме грешка директно на полето
            return { passwordMismatch: true };
        } else {
            // Ако има други грешки, не ги трием
            if (repass.hasError('passwordMismatch')) {
                repass.setErrors(null);
            }
            return null;
        }
    }

    getControl(form: FormGroup, controlName: string) {
        return form.get(controlName);
    }

    isControlInvalid(form: FormGroup, controlName: string): boolean {
        const control = this.getControl(form, controlName);
        return control?.invalid && (control?.dirty || control?.touched) || false;
    }

    isNestedControlInvalid(form: FormGroup, groupName: string, controlName: string): boolean {
        const control = this.getNestedControl(form, groupName, controlName);
        return control?.invalid && (control?.dirty || control?.touched) || false;
    }


    getFirstNameErrorMessage(form: FormGroup): string {
        const control = this.getControl(form, 'firstName');
        if (control?.errors?.['required']) {
            return 'First name is required!';
        }
        if (control?.errors?.['minlength']) {
            return 'First Name should have at least 4 symbols!';
        }
        return '';
    }

    getLastNameErrorMessage(form: FormGroup): string {
        const control = this.getControl(form, 'lastName');
        if (control?.errors?.['required']) {
            return 'Last name is required!';
        }
        if (control?.errors?.['minlength']) {
            return 'Last Name should have at least 4 symbols!';
        }
        return '';
    }

    getEmailErrorMessage(form: FormGroup): string {
        const control = this.getControl(form, 'email');
        if (control?.errors?.['required']) {
            return 'Email is required!';
        }
        if (control?.errors?.['pattern']) {
            return 'Email should be a valid email address!';
        }
        return '';
    }

    getPasswordErrorMessage(form: FormGroup, isRegister = false): string {
        const passwordControl = isRegister
            ? this.getNestedControl(form, 'passwords', 'password')
            : this.getControl(form, 'password');

        if (passwordControl?.errors?.['required']) {
            return 'Password is required!';
        }
        if (passwordControl?.errors?.['minlength']) {
            return 'Password should be at least 5 characters!';
        }
        if (passwordControl?.errors?.['pattern']) {
            return 'Password should contain only English letters and digits!';
        }

        if (isRegister) {
            const group = form.get('passwords') as FormGroup;
            if (group?.errors?.['passwordMismatch']) {
                return 'Passwords do not match!';
            }
        }

        return '';
    }

    getRePasswordErrorMessage(form: FormGroup): string {
        const control = this.getNestedControl(form, 'passwords', 'repass');
        const group = form.get('passwords') as FormGroup;

        if (control?.errors?.['required']) {
            return 'Repeat Password is required!';
        }
        if (group?.errors?.['passwordMismatch']) {
            return 'Passwords do not match!';
        }

        return '';
    }

    markFormTouched(form: FormGroup): void {
        Object.keys(form.controls).forEach(key => {
            const control = form.get(key);
            if (control instanceof FormGroup) {
                Object.keys(control.controls).forEach(nestedKey => {
                    const nestedControl = control.get(nestedKey);
                    nestedControl?.markAsTouched();
                });
            } else {
                control?.markAsTouched();
            }
        });
    }

    isFormInvalid(form: FormGroup): boolean {
        return form.invalid;
    }

    getProfileFormValue(form: FormGroup) {
    const { firstName, lastName, email, picture } = form.value;
    const { password, repass } = form.value.passwords;

    return {
        firstName,
        lastName,
        email,
        picture,
        password,
        repass
    };
}
}
