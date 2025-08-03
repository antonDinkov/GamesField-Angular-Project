import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateFormService } from '../../core/services/create-form.service';
import { CreateService } from '../../core/services/create-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {
    private create = inject(CreateService)
    private router = inject(Router)
    form!: FormGroup;

    constructor(public formService: CreateFormService){
        this.form = formService.createCreateForm();
    }

    onSubmit(){
        const { title, manufacturer, genre, instructions, description, imageUrl, gameUrl } = this.formService.getFormValue(this.form);
        this.create.create(title, manufacturer, genre, imageUrl, gameUrl, description, instructions).subscribe({
            next: () => {
                this.router.navigate(['/catalog'])
            },
                error: (err) => {
                    console.error('Create Game Failed:', err);
                    this.formService.markFormTouched(this.form)
                }
        })
    }
}
