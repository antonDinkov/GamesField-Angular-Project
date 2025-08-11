import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { GetById } from '../../../core/services/get-by-id';
import { AuthService } from '../../../core/services/auth-service';
import { RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-profile',
    imports: [RouterLink],
    templateUrl: './profile.html',
    styleUrl: './profile.css'
})
export class Profile implements OnInit {
    public currentUser!: User | null;
    private getGameService = inject(GetById);
    private authService = inject(AuthService);
    public myGames: string[] = [];


    constructor(private location: Location) { }

    ngOnInit(): void {
        this.authService.checkSession().subscribe(user => {
            this.currentUser = user;
            localStorage.removeItem('user');
            localStorage.setItem('user', JSON.stringify(user));
            if (this.currentUser && (this.currentUser?.myGames.length > 0)) {
                for (const game of this.currentUser.myGames) {
                    this.getGameService.getGameById(game).subscribe(response => {
                        this.myGames.push(response.post.name)
                    })
                }
            }
        });
    }

    goBack(): void {
        this.location.back();
    }
}
