import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { StarwarsService } from '../../services/starwars.service';
import { Observable } from 'rxjs';
import { StarshipResults } from '../../interfaces/starship';
import { StarshipItemComponent } from "../../starship-item/starship-item.component";


@Component({
    selector: 'app-starship-list',
    standalone: true,
    templateUrl: './starship-list.component.html',
    styleUrl: './starship-list.component.scss',
    imports: [AsyncPipe, StarshipItemComponent]
})
export class StarshipListComponent implements OnInit{
  public starshipResult$! : Observable<StarshipResults>;
  constructor(private service: StarwarsService) { }

  ngOnInit(): void {
    this.starshipResult$ = this.service.getStarShipList();
  }
}
