import { Component, inject } from '@angular/core';
import { AuthFormService } from '../../../core/services/auth-form.service';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
    formService = inject(AuthFormService);
    private authService = inject(AuthService);
    private router = inject(Router);

    form: FormGroup;
    constructor(private location: Location){
        this.form = this.formService.createRegisterForm();
    }

    onSubmit(): void{
        if (!this.formService.isFormInvalid(this.form)) {
            const {firstname, lastname, email, password, repass} = this.formService.getRegisterFormValue(this.form);

            this.authService.register(firstname, lastname, email, password, repass).subscribe({
                next: (user) => {
                    console.log('Registered user:', user);
                    this.router.navigate(['/'])
                },
                error: (err) => {
                    console.error('Registration failed:', err);
                    this.formService.markFormTouched(this.form)
                }
            })
        }
    }

    goBack(): void {
        this.location.back();
    }
}
