import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StarshipResults } from '../interfaces/starship';
import { Starship } from '../interfaces/starship';
import { Pilot } from '../interfaces/pilots';
import { Film } from '../interfaces/film';

@Injectable({
  providedIn: 'root'
})

export class StarwarsService {

  private baseUrl = 'https://swapi.dev/api/';
  //Alternative API in case the previous one does not work:
  //private baseUrl = 'https://swapi.py4e.com/api';
  private imageBaseUrl = 'https://starwars-visualguide.com/assets/img';

  constructor(private http: HttpClient) { }

  getStarShipList(url: string = `${this.baseUrl}/starships`): Observable<StarshipResults> {
    return this.http.get<StarshipResults>(url);
  }

  getStarshipDetails(id: string): Observable<Starship> {
    return this.http.get<Starship>(`${this.baseUrl}/starships/${id}`);
  }

  getStarshipImage(id: string) {
    return `${this.imageBaseUrl}/starships/${id}.jpg`;
  }

  getPilotDetails(url: string): Observable<Pilot> {
    return this.http.get<Pilot>(url);
  }

  getFilmDetails(url: string): Observable<Film> {
    return this.http.get<Film>(url);
  }

}
