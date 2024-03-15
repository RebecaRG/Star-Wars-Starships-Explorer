import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { StarshipListComponent } from '../starship-list/starship-list.component';
import { RouterOutlet, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, StarshipListComponent, RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) { }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);

  }


}
