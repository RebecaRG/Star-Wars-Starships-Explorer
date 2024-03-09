import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarwarsService } from '../../services/starwars.service';
import { Starship } from '../../interfaces/starship';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit{
  starship$!: Observable<Starship>;

  constructor(private route: ActivatedRoute, private service: StarwarsService) { }
  
  ngOnInit() {
    this.starship$ = this.route.params.pipe(
      switchMap(params => {
        const id = params['id'];
        return this.service.getStarshipDetails(id);
      })
    );
  }
}
