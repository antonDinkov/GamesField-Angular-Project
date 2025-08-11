import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthFormService } from '../../../core/services/auth-form.service';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { BackendError } from '../../../models/beckendError.model';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnDestroy, OnInit {
    formService = inject(AuthFormService);
    private authService = inject(AuthService);
    private router = inject(Router);
    private registerSubscription?: Subscription;

    public errorToShow: BackendError | null = null;

    form!: FormGroup;
    constructor(private location: Location){}

    ngOnInit(): void {
        this.form = this.formService.createRegisterForm();
    }

    onSubmit(): void{
        if (!this.formService.isFormInvalid(this.form)) {
            const {firstname, lastname, email, password, repass} = this.formService.getRegisterFormValue(this.form);

            this.registerSubscription = this.authService.register(firstname, lastname, email, password, repass).subscribe({
                next: (user) => {
                    console.log('Registered user:', user);
                    this.router.navigate(['/'])
                },
                error: (err) => {
                    console.error('Registration failed:', err);

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

                    this.formService.markFormTouched(this.form)
                }
            })
        }
    }

    ngOnDestroy() {
        if (this.registerSubscription) {
            this.registerSubscription.unsubscribe();
            console.log('Register request cancelled due to component destroy');
        }
    }

    goBack(): void {
        this.location.back();
    }
}
