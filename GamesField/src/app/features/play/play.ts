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
    safeUrl!: SafeResourceUrl;

    constructor(
        private route: ActivatedRoute,
        private getById: GetById,
        private sanitizer: DomSanitizer
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.getById.getGameById(id).subscribe((game: Game) => {
                this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(game.iframeUrl);
            });
        }
    }
}

