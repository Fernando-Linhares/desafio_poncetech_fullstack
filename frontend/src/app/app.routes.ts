import { Routes } from '@angular/router';
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {HomeComponent} from "./pages/home/home.component";
import {authGuard} from "./guards/auth.guard";
import {NotFoundComponent} from "./pages/auth/not-found/not-found.component";


export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    canActivate: [authGuard],
    path: 'dashboard',
    component: HomeComponent,
  },
  {
    path: '404',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
