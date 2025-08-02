import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class CreateFormService {
    private formBuilder = inject(FormBuilder);

    createCreateForm(): FormGroup {
        return this.formBuilder.group({
            title: ['', [Validators.required]],
            manufacturer: ['', [Validators.required]],
            genre: ['', [Validators.required]],
            instructions: ['', [Validators.required, Validators.minLength(10)]],
            description: ['', [Validators.required, Validators.minLength(20)]],
            imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\//)]],
            gameUrl: ['', [Validators.required]],
        })
    }

    getControl(form: FormGroup, controlName: string) {
        return form.get(controlName);
    }

    isControlInvalid(form: FormGroup, controlName: string): boolean {
        const control = this.getControl(form, controlName);
        return control?.invalid && (control?.dirty || control?.touched) || false;
    }

    getTitleErrorMessage(form: FormGroup): string {
        const control = this.getControl(form, 'title');
        if (control?.errors?.['required']) {
            return 'Title is required!';
        }
        return '';
    }

    getManufacturerErrorMessage(form: FormGroup): string {
        const control = this.getControl(form, 'manufacturer');
        if (control?.errors?.['required']) {
            return 'Manufacturer is required!';
        }
        return '';
    }

    getGenreErrorMessage(form: FormGroup): string {
        const control = this.getControl(form, 'genre');
        if (control?.errors?.['required']) {
            return 'Genre is required!';
        }
        return '';
    }

    getInstructionsErrorMessage(form: FormGroup): string {
        const control = this.getControl(form, 'instructions');
        if (control?.errors?.['required']) {
            return 'Instructions is required!';
        }
        if (control?.errors?.['minlength']) {
            return 'Instructions should be atleast 10 characters long!';
        }
        return '';
    }

    getDescriptionErrorMessage(form: FormGroup): string {
        const control = this.getControl(form, 'description');
        if (control?.errors?.['required']) {
            return 'Description is required!';
        }
        if (control?.errors?.['minlength']) {
            return 'Description should be atleast 10 characters long!';
        }
        return '';
    }

    getImageUrlErrorMessage(form: FormGroup): string {
        const control = this.getControl(form, 'imageUrl');
        if (control?.errors?.['required']) {
            return 'Image URL is required!';
        }
        if (control?.errors?.['pattern']) {
            return 'Image URL should always start with "http://" or "https://"!';
        }
        return '';
    }

    getGameUrlErrorMessage(form: FormGroup): string {
        const control = this.getControl(form, 'gameUrl');
        if (control?.errors?.['required']) {
            return 'Game URL is required!';
        }
        if (control?.errors?.['pattern']) {
            return 'Game URL should be a valid email address!';
        }
        return '';
    }

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

    getFormValue(form: FormGroup) {
        const { title, manufacturer, genre, instructions, description, imageUrl, gameUrl } = form.value;

        return {
            title,
            manufacturer,
            genre,
            instructions,
            description,
            imageUrl,
            gameUrl
        };
    }
}
