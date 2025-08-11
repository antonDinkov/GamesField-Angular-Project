import { Component, inject, OnDestroy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateFormService } from '../../core/services/create-form.service';
import { CreateService } from '../../core/services/create-service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { BackendError } from '../../models/beckendError.model';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create implements OnDestroy {
    private create = inject(CreateService)
    private router = inject(Router)
    form!: FormGroup;

    public errorToShow: BackendError | null = null;

    private createSubscription?: Subscription;

    constructor(private location: Location, public formService: CreateFormService){
        this.form = formService.createCreateForm();
    }

    onSubmit(){
        const { title, manufacturer, genre, instructions, description, imageUrl, gameUrl } = this.formService.getFormValue(this.form);
        this.createSubscription = this.create.create(title, manufacturer, genre, imageUrl, gameUrl, description, instructions).subscribe({
            next: () => {
                this.router.navigate(['/catalog'])
            },
                error: (err) => {
                    console.error('Create Game Failed:', err);

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

    ngOnDestroy(): void {
        this.createSubscription?.unsubscribe();
        console.log('Create request cancelled due to component destroy');
    }

    goBack(): void {
        this.location.back();
    }
}
