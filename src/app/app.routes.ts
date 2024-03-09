import { Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { StarshipListComponent } from './components/starship-list/starship-list.component';
import { DetailsComponent } from './components/details/details.component';

export const routes: Routes = [
    {path: 'home', component: WelcomeComponent},
    {path: 'starships', component: StarshipListComponent},
    {path: 'starships/:id', component: DetailsComponent },
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
