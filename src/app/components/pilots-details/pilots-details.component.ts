import { Component,Input, OnInit} from '@angular/core';
import { StarwarsService } from '../../services/starwars.service';
import { Pilot } from '../../interfaces/pilots';
import { forkJoin, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pilots-details',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './pilots-details.component.html',
  styleUrl: './pilots-details.component.scss'
})
export class PilotsDetailsComponent implements OnInit{
  pilots$!: Observable<Pilot[]>;
  @Input() pilotsUrl: string[] = [];

  constructor(private service: StarwarsService) { };

  ngOnInit(): void {
    if(this.pilotsUrl.length > 0){
    this.pilots$ = forkJoin(this.pilotsUrl.map(url => this.service.getPilotDetails(url)));
  }
}

getPilotImage(url:string):string {
  let id = url.split('/').filter(Boolean).pop();
  return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
}
}




