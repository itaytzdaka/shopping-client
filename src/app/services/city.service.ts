import { CityModel } from './../models/city.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  public getAllCitiesAsync(): Promise<CityModel[]> {
    return this.http.get<CityModel[]>("http://localhost:3000/api/cities").toPromise();
  }
}
