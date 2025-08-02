import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create',
  imports: [],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {
    form!: FormGroup;

    constructor(){
        
    }
}
