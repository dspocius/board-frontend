import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { BoardComponent } from './board/board.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'board', component: BoardComponent },
    { path: 'home', component: LoginComponent },
    { path: 'login', component: LoginComponent }
];
