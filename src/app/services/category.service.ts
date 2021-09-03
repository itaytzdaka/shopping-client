import { CategoryModel } from './../models/category.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  public getAllCategoriesAsync(): Promise<CategoryModel[]> {
    return this.http.get<CategoryModel[]>("http://localhost:3000/api/categories").toPromise();
  }
}
