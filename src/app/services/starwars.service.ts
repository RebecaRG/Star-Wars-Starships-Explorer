import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StarshipResults } from '../interfaces/starship';

@Injectable({
  providedIn: 'root'
})

 export class StarwarsService {

  private baseUrl = 'https://swapi.py4e.com/api/starships/';

   constructor(private http: HttpClient) { }

   getStarShipList(url: string = `${this.baseUrl}?limit=10&page=1`): Observable<StarshipResults> {
    return this.http.get<StarshipResults>(url);
   }

   
}
