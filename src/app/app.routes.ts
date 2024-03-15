import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { userGuard } from './guards/user.guard';

export const routes: Routes = [
    {path: 'home', component: WelcomeComponent, canActivate:[userGuard]},
    {path: 'starships', component: StarshipListComponent, canActivate:[userGuard]},
    {path: 'starships/:id', component: DetailsComponent, canActivate:[userGuard]},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
