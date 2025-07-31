import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import("./features/home/home-board/home-board").then(c => c.HomeBoard),
        pathMatch: 'full'
    },
    {
        path: "catalog",
        loadComponent: () => import("./features/catalog/catalog").then(c => c.Catalog)
    },
    {
        path: "details/:name/:id",
        loadComponent: ()=> import("./features/details/details").then(c => c.Details)
    },
    {
        path: "register",
        loadComponent: () => import("./features/auth/register/register").then(c => c.Register)
    },
    {
        path: "login",
        loadComponent: () => import("./features/auth/login/login").then(c => c.Login)
    },
    {
        path: "logout",
        loadComponent: () => import("./features/auth/logout/logout").then(c => c.Logout)
    }
];
