import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations';
@Component({
    selector: 'app-error-page',
    imports: [RouterLink],
    templateUrl: './error-page.html',
    styleUrl: './error-page.css',
    animations: [
        trigger('fadeInUp', [
            state('void', style({ opacity: 0, transform: 'translateY(50px)' })),
            transition(':enter', [
                animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ])
    ]
})
export class ErrorPage {

}
