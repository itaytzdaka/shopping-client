import { ProductModel } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getAllProductsAsync(): Promise<ProductModel[]> {
    return this.http.get<ProductModel[]>(baseUrl+ "/api/products").toPromise();
  }

  public updateProductAsync(productToUpdate: ProductModel): Promise<ProductModel> {
    return this.http.put<ProductModel>(`${baseUrl}/api/products/${productToUpdate._id}`, productToUpdate).toPromise();
  }

  public addProductAsync(productToAdd: ProductModel): Promise<ProductModel> {
    return this.http.post<ProductModel>(`${baseUrl}/api/products`, productToAdd).toPromise();
  }

  public getNumOfProductsAsync(): Promise<number> {
    return this.http.get<number>(`${baseUrl}/api/products/count`).toPromise();
  }


}
