import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthFormService } from '../../../core/services/auth-form.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '../store/auth/auth.actions';
import { selectError, selectLoading } from '../store/auth/auth.selectors';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit, OnDestroy {
  public formService = inject(AuthFormService);
  private store = inject(Store);

  form!: FormGroup;

  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  errorToShow: { message: string } | null = null;

  private errorSubscription?: Subscription;

  constructor(private location: Location){}

  ngOnInit(): void {
    this.form = this.formService.createLoginForm();

    // Абонираме се за грешките от стор, за да ги покажем в errorToShow
    this.errorSubscription = this.error$.subscribe(error => {
      if (error) {
        this.errorToShow = { message: error };
        this.formService.markFormTouched(this.form);
      } else {
        this.errorToShow = null;
      }
    });
  }

  onSubmit(): void {
    if (!this.formService.isFormInvalid(this.form)) {
      const { email, password } = this.formService.getLoginFormValue(this.form);
      this.store.dispatch(AuthActions.login({ email, password }));
    }
  }

  ngOnDestroy() {
    this.errorSubscription?.unsubscribe();
  }

  goBack(): void {
        this.location.back();
    }
}


/* import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthFormService } from '../../../core/services/auth-form.service';
import { AuthService } from '../../../core/services/auth-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { BackendError } from '../../../models/beckendError.model';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule],
    templateUrl: './login.html',
    styleUrl: './login.css'
})
export class Login implements OnInit, OnDestroy {
    formService = inject(AuthFormService);
    private authService = inject(AuthService);
    private router = inject(Router);

    public errorToShow: BackendError | null = null;

    private loginSubscription?: Subscription;

    form!: FormGroup;

    constructor(private location: Location) { }

    ngOnInit(): void {
        this.form = this.formService.createLoginForm();
    }

    onSubmit(): void {
        if (!this.formService.isFormInvalid(this.form)) {
            const { email, password } = this.formService.getLoginFormValue(this.form);

            this.loginSubscription = this.authService.login(email, password).subscribe({
                next: (user) => {
                    this.router.navigate(['/'])
                },
                error: (err) => {
                    console.error('Login failed:', err);

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
            })
        }
    }

    ngOnDestroy() {
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
            console.log('Login request cancelled due to component destroy');
        }
    }

    goBack(): void {
        this.location.back();
    }
} */