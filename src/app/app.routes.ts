import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';

export const routes: Routes = [
    {path: 'home', component: WelcomeComponent},
    {path: 'starships', component: StarshipListComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
