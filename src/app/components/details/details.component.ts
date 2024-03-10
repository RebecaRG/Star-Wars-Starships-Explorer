import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarwarsService } from '../../services/starwars.service';
import { Starship } from '../../interfaces/starship';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  starship$!: Observable<Starship>;
  imageUrl: string = '';

  constructor(private route: ActivatedRoute, private service: StarwarsService) { }
  
  ngOnInit() {
    this.starship$ = this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        this.imageUrl = this.service.getStarshipImage(id);
        return this.service.getStarshipDetails(id);
      })
    );
  }

  imageError(){
    this.imageUrl = 'https://starwars-visualguide.com/assets/img/big-placeholder.jpg';
  }
}
