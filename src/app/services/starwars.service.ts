import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StarshipResults } from '../interfaces/starship';
import { Starship } from '../interfaces/starship';

@Injectable({
  providedIn: 'root'
})

 export class StarwarsService {
  static getStarShipList() {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'https://swapi.py4e.com/api';

   constructor(private http: HttpClient) { }

   getStarShipList(url: string = `${this.baseUrl}/starships`): Observable<StarshipResults> {
    return this.http.get<StarshipResults>(url);
   }

   getStarshipDetails(id: string) : Observable<Starship>{
    return this.http.get<Starship>(`${this.baseUrl}/starships/${id}`);
   }

   
}
