import { Router } from '@angular/router';
import { ProductModel } from './../models/product.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActionType } from "src/app/redux/action-type";
import { store } from "src/app/redux/store";


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  public getAllProductsAsync(): Promise<ProductModel[]> {
    return this.http.get<ProductModel[]>("http://localhost:3000/api/products").toPromise();
  }

  public updateProductAsync(_id: string ,productToUpdate: ProductModel): Promise<ProductModel> {
    return this.http.put<ProductModel>(`http://localhost:3000/api/products/${_id}`, productToUpdate).toPromise();
    
  }

  public addProductAsync(productToAdd: ProductModel): Promise<ProductModel> {
    return this.http.post<ProductModel>(`http://localhost:3000/api/products`, productToAdd).toPromise();
  }

  public getNumOfProductsWithReduxAsync(): void {
    this.http
      .get<number>("http://localhost:3000/api/products/count")
      .subscribe(numOfProducts => {
        store.dispatch({ type: ActionType.saveNumOfProducts, payload: numOfProducts });
      });
  }


}
