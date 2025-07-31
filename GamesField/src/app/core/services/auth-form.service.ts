import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class AuthFormService {
    private formBuilder = inject(FormBuilder);

    // --------- Register Form ---------
    createRegisterForm(): FormGroup {
        return this.formBuilder.group({
            firstname: ['', [Validators.required, Validators.minLength(5)]],
            lastname: ['', [Validators.required, Validators.minLength(5)]],
            email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
                repass: ['', [Validators.required]],
            }, { validators: this.passwordMatchValidator })
        });
    }

    // --------- Login Form ---------
    createLoginForm(): FormGroup {
        return this.formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/)]],
            password: ['', [Validators.required, Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
        });
    }

    // --------- Getters (Generic) ---------
    getControl(form: FormGroup, controlName: string) {
        return form.get(controlName);
    }

    getNestedControl(form: FormGroup, groupName: string, controlName: string) {
        return (form.get(groupName) as FormGroup)?.get(controlName);
    }

    // --------- Validators ---------
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

    // --------- Error Helpers ---------
    isControlInvalid(form: FormGroup, controlName: string): boolean {
        const control = this.getControl(form, controlName);
        return control?.invalid && (control?.dirty || control?.touched) || false;
    }

    isNestedControlInvalid(form: FormGroup, groupName: string, controlName: string): boolean {
        const control = this.getNestedControl(form, groupName, controlName);
        return control?.invalid && (control?.dirty || control?.touched) || false;
    }

    getEmailErrorMessage(form: FormGroup): string {
        const control = this.getControl(form, 'email');
        if (control?.errors?.['required']) {
            return 'Email is required!';
        }
        if (control?.errors?.['pattern']) {
            return 'Email should be a valid Gmail address!';
        }
        return '';
    }

    getFirstnameErrorMessage(form: FormGroup): string {
        const control = this.getControl(form, 'firstname');
        if (control?.errors?.['required']) {
            return 'First name is required!';
        }
        if (control?.errors?.['minlength']) {
            return 'First Name should have at least 5 symbols!';
        }
        return '';
    }

    getLastnameErrorMessage(form: FormGroup): string {
        const control = this.getControl(form, 'lastname');
        if (control?.errors?.['required']) {
            return 'Last name is required!';
        }
        if (control?.errors?.['minlength']) {
            return 'Last Name should have at least 5 symbols!';
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

    // --------- Utility Methods ---------
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

    getRegisterFormValue(form: FormGroup) {
        const { username, email, phone } = form.value;
        const { password, rePassword } = form.value.passwords;

        return {
            username,
            email,
            phone,
            password,
            rePassword
        };
    }

    getLoginFormValue(form: FormGroup) {
        const { email, password } = form.value;
        return { email, password };
    }
}