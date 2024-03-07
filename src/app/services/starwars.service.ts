import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StarshipResults } from '../interfaces/starship';

@Injectable({
  providedIn: 'root'
})

 export class StarwarsService {

   constructor(private http: HttpClient) { }

   getStarShipList(): Observable<StarshipResults>{
      return this.http.get<StarshipResults>('https://swapi.py4e.com/api/starships/?limit=10&offset=0');
   }
}
