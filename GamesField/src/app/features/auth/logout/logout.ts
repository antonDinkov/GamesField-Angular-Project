import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css'
})
export class Logout implements OnInit{
    private router = inject(Router);
    private authService = inject(AuthService);
    
    ngOnInit(): void {
        this.authService.logout().subscribe(() => {
            this.router.navigate(['/']);
        })
    }
    
}
