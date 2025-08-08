import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-edit',
  imports: [],
  templateUrl: './edit.html',
  styleUrl: './edit.css'
})
export class Edit {

    constructor(private location: Location) {}

    /* private getGame = inject(GetById);
    private edit = inject(EditFormService)
    gameInfo!: Observable<GameDetailsResponse | null>;
    form: FormGroup;
    private id: string = '';
    private name: string = '';

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
                    this.formService.markFormTouched(this.form);
                }
        })
    } */

    goBack(): void {
    this.location.back();
  }

}
