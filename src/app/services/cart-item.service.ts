import { Injectable } from '@angular/core';
import { CartItemModel } from './../models/cart-item.model';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  constructor(private http: HttpClient) { }

  public getAllCartItemsAsync(_id): Promise<CartItemModel[]> {
    return this.http.get<CartItemModel[]>("http://localhost:3000/api/cartsItems/" + _id).toPromise();
  }

  public addCartItemAsync(cartItemToAdd: CartItemModel): Promise<CartItemModel> {
    return this.http.post<CartItemModel>("http://localhost:3000/api/cartsItems",cartItemToAdd).toPromise();
  }

  public updateCartItemAsync(cartItemToUpdate: CartItemModel): Promise<CartItemModel> {
    return this.http.put<CartItemModel>("http://localhost:3000/api/cartsItems/"+cartItemToUpdate._id,cartItemToUpdate).toPromise();
  }

  public deleteCartItemAsync(_id): void {
    this.http.delete("http://localhost:3000/api/cartsItems/" + _id).toPromise();
  }

}
