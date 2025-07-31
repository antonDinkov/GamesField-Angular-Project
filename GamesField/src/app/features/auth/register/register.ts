import { Component, inject } from '@angular/core';
import { AuthFormService } from '../../../core/services/auth-form.service';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    constructor(){
        this.form = this.formService.createRegisterForm();
    }

    onSubmit(){}
}
