import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthFormService } from '../../../core/services/auth-form.service';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
    formService = inject(AuthFormService);
    private authService = inject(AuthService);
    private router = inject(Router)

    form: FormGroup;

    constructor (private location: Location) {
        this.form = this.formService.createLoginForm();
    }

    onSubmit(): void {
        if (!this.formService.isFormInvalid(this.form)) {
            const { email, password } = this.formService.getLoginFormValue(this.form);
            
            this.authService.login(email, password).subscribe({
                next: (user) => {
                    this.router.navigate(['/'])
                },
                error: (err) => {
                    console.error('Login failed:', err);
                    this.formService.markFormTouched(this.form)
                }
            })
        }
    }

    goBack(): void {
        this.location.back();
    }
}
