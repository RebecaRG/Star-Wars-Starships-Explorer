import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { StarshipListComponent } from '../starship-list/starship-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, StarshipListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


}
