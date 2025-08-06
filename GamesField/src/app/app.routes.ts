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
        path: "create",
        loadComponent: () => import("./features/create/create").then(c => c.Create)
    },
    {
        path: "details/:name/:id",
        loadComponent: ()=> import("./features/details/details").then(c => c.Details)
    },
    {
        path: "details/:name/:id/edit",
        loadComponent: ()=> import("./features/details/edit/edit").then(c => c.Edit)
    },
    {
        path: "details/:name/:id/delete",
        loadComponent: ()=> import("./features/details/delete/delete").then(c => c.Delete)
    },
    {
        path: "profile",
        loadComponent: () => import("./features/profile/profile/profile").then(c => c.Profile)
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
    },
    {
        path: "search",
        loadComponent: () => import("./features/search/search").then(c => c.Search)
    }
];
