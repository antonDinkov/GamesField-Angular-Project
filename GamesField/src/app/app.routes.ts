import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./features/home/home-board/home-board").then(c => c.HomeBoard)
    },
    {
        path: "catalog",
        loadComponent: () => import("./features/catalog/catalog").then(c => c.Catalog)
    }
];
