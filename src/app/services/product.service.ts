import { ProductModel } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getAllProductsAsync(): Promise<ProductModel[]> {
    return this.http.get<ProductModel[]>("http://localhost:3000/api/products").toPromise();
  }

  public updateProductAsync(productToUpdate: ProductModel): Promise<ProductModel> {
    return this.http.put<ProductModel>(`http://localhost:3000/api/products/${productToUpdate._id}`, productToUpdate).toPromise();
  }

  public addProductAsync(productToAdd: ProductModel): Promise<ProductModel> {
    return this.http.post<ProductModel>(`http://localhost:3000/api/products`, productToAdd).toPromise();
  }

  public getNumOfProductsAsync(): Promise<number> {
    return this.http.get<number>(`http://localhost:3000/api/products/count`).toPromise();
  }


}
