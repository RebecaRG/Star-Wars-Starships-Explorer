import { Component, OnInit, TrackByFunction, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { StarwarsService } from '../../services/starwars.service';
import { Observable } from 'rxjs';
import { StarshipResults } from '../../interfaces/starship';
import { InfiniteScrollModule } from 'ngx-infinite-scroll'; 
import { Starship } from '../../interfaces/starship';

@Component({
    selector: 'app-starship-list',
    standalone: true,
    templateUrl: './starship-list.component.html',
    styleUrl: './starship-list.component.scss',
    imports: [AsyncPipe, InfiniteScrollModule]
})
export class StarshipListComponent implements OnInit{
  public starshipResult$! : Observable<StarshipResults>;
  constructor(private service: StarwarsService) { }

  starshipArray: Starship[] = [];
  nextUrl: string = '';

  ngOnInit(): void {
    this.starshipResult$ = this.service.getStarShipList();

  this.service.getStarShipList().subscribe({
    next: (response) => {
      this.starshipArray = response.results;
      this.nextUrl = response.next ? response.next : 'endOfData';
    }
  })
  }

  onScroll() {
    if (this.nextUrl && this.nextUrl !== 'endOfData') { 
      this.service.getStarShipList(this.nextUrl).subscribe({
        next: (response) => {
          this.starshipArray = [...this.starshipArray, ...response.results];
          this.nextUrl = response.next || 'endOfData'; 
        }
      });
    }
  }
  
    moreInfo(){
      console.log(this.starshipArray);
    }
}

