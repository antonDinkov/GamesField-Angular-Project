import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GetById } from '../../core/services/get-by-id';
import { Game } from '../../models/game.model';

@Component({
    selector: 'app-play',
    imports: [],
    templateUrl: './play.html',
    styleUrl: './play.css'
})
export class Play implements OnInit {
    safeUrl!: string;

    constructor(
        private route: ActivatedRoute,
        private getById: GetById,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        console.log(id);
        
        if (id) {
            this.getById.getGameById(id).subscribe((game: Game) => {
                console.log('Received game:', game);
               
                this.safeUrl = game.iframeUrl.trim();
            });
        }
    }

    getSafeUrl(url: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url)
    }
}

