import { Component, inject, OnInit, signal } from '@angular/core';
import { GetById } from '../../../core/services/get-by-id';
import { ActivatedRoute, Router } from '@angular/router';
import { GameDetailsResponse } from '../../../models/gameDetailsResponse.model';
import { Observable } from 'rxjs';
import { CreateFormService } from '../../../core/services/create-form.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EditFormService } from '../../../core/services/edit-form.service';
import { Location } from '@angular/common';
import { BackendError } from '../../../models/beckendError.model';

@Component({
    selector: 'app-edit',
    imports: [ReactiveFormsModule],
    templateUrl: './edit.html',
    styleUrl: './edit.css',
    providers: [GetById]
})
export class Edit implements OnInit {
    private getGame = inject(GetById);
    private edit = inject(EditFormService)
    gameInfo!: Observable<GameDetailsResponse | null>;
    form: FormGroup;
    private id: string = '';
    private name: string = '';

    public errorToShow: BackendError | null = null;

    constructor(private location: Location, private route: ActivatedRoute, private router: Router, public formService: CreateFormService) {
        this.form = this.formService.createCreateForm();
    };

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            this.name = params['name'];
            this.getGame.getGameById(this.id).subscribe(response => {
                const game = response?.post;
                if (game) {
                    this.form.patchValue({
                        title: game.name,
                        manufacturer: game.manufacturer,
                        genre: game.genre,
                        instructions: game.instructions,
                        description: game.description,
                        imageUrl: game.image,
                        gameUrl: game.iframeUrl
                    })
                }
            });
        });
    };

    onSubmit(){
        const { title, manufacturer, genre, instructions, description, imageUrl, gameUrl } = this.formService.getFormValue(this.form);
        console.log(imageUrl, gameUrl);
        
        this.edit.edit(this.id, title, manufacturer, genre, imageUrl, gameUrl, description, instructions).subscribe({
            next: ()=> {
                this.router.navigate([`/details/${this.name}/${this.id}`]);
            },
            error: (err) => {
                    console.error('Edit Game Failed:', err);

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

    goBack(): void {
        this.location.back();
    }
}
