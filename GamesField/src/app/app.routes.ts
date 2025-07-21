import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "catalog",
        loadComponent: () => import("./features/catalog/catalog").then(c => c.Catalog)
    }
];
