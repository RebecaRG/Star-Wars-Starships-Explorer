import { Component,Input, OnInit} from '@angular/core';
import { StarwarsService } from '../../services/starwars.service';
import { Film } from '../../interfaces/film';
import { forkJoin, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-films-details',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './films-details.component.html',
  styleUrl: './films-details.component.scss'
})
export class FilmsDetailsComponent {
  films$!: Observable<Film[]>;
  @Input() filmsUrl: string[] = [];

  constructor(private service: StarwarsService) { };

  ngOnInit(): void {
    if(this.filmsUrl.length > 0){
      this.films$ = forkJoin(this.filmsUrl.map(url => this.service.getFilmDetails(url)));
  }
}

getFilmImage(url:string):string {
  let id = url.split('/').filter(Boolean).pop();
  return `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
}
}
