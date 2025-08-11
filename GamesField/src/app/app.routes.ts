import { Routes } from '@angular/router';
import { authGuardGuard } from './core/guards/auth-guard-guard';
import { guestGuardGuard } from './core/guards/guest-guard-guard';

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
        canActivate: [authGuardGuard],
        loadComponent: () => import("./features/create/create").then(c => c.Create)
    },
    {
        path: "details/:name/:id",
        loadComponent: ()=> import("./features/details/details").then(c => c.Details)
    },
    {
        path: "details/:name/:id/edit",
        canActivate: [authGuardGuard],
        loadComponent: ()=> import("./features/details/edit/edit").then(c => c.Edit)
    },
    {
        path: "details/:name/:id/delete",
        canActivate: [authGuardGuard],
        loadComponent: ()=> import("./features/details/delete/delete").then(c => c.Delete)
    },
    {
        path: "profile",
        canActivate: [authGuardGuard],
        loadComponent: () => import("./features/profile/profile/profile").then(c => c.Profile)
    },
    {
        path: "profile/:id/edit",
        canActivate: [authGuardGuard],
        loadComponent: () => import("./features/profile/edit/edit").then(c => c.Edit)
    },
    {
        path: "register",
        canActivate: [guestGuardGuard],
        loadComponent: () => import("./features/auth/register/register").then(c => c.Register)
    },
    {
        path: "login",
        canActivate: [guestGuardGuard],
        loadComponent: () => import("./features/auth/login/login").then(c => c.Login)
    },
    {
        path: "logout",
        canActivate: [authGuardGuard],
        loadComponent: () => import("./features/auth/logout/logout").then(c => c.Logout)
    },
    {
        path: "search",
        loadComponent: () => import("./features/search/search").then(c => c.Search)
    },
    {
        path: "**",
        loadComponent: () => import("./shared/error-page/error-page").then(c => c.ErrorPage)
    }
];
