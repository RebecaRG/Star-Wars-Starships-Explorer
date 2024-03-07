import { Component, Input } from '@angular/core';
import { Starship } from '../interfaces/starship'; // Fixed the import path

@Component({
  selector: 'app-starship-item',
  standalone: true,
  imports: [],
  templateUrl: './starship-item.component.html',
  styleUrl: './starship-item.component.scss'
})
export class StarshipItemComponent {
  @Input() starshipInfo!: Starship;

}
