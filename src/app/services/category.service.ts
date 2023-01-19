import { CategoryModel } from './../models/category.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getAllCategoriesAsync(): Promise<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(baseUrl+ "/api/categories").toPromise();
  }
}
