import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CreateFormService } from '../../core/services/create-form.service';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {
    form!: FormGroup;

    constructor(public formService: CreateFormService){
        this.form = formService.createCreateForm();
    }

    onSubmit(){

    }
}
