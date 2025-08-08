import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { GetById } from '../../../core/services/get-by-id';
import { AuthService } from '../../../core/services/auth-service';

@Component({
    selector: 'app-profile',
    imports: [],
    templateUrl: './profile.html',
    styleUrl: './profile.css'
})
export class Profile implements OnInit {
    public currentUser!: User;
    private getGameService = inject(GetById);
    private authService = inject(AuthService);
    public myGames: string[] = []

    constructor() { }

    ngOnInit(): void {
        this.authService.checkSession().subscribe(user=>{
            this.currentUser = user;
            if (this.currentUser && (this.currentUser?.myGames.length > 0)) {
            for (const game of this.currentUser.myGames) {
                this.getGameService.getGameById(game).subscribe(response => {
                    this.myGames.push(response.post.name)
                })
            }
        }
        });
    }
}
