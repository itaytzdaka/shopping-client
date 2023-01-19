import { Injectable } from '@angular/core';
import { CartItemModel } from './../models/cart-item.model';
import { HttpClient } from "@angular/common/http";
import { baseUrl } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  constructor(private http: HttpClient) { }

  public getAllCartItemsAsync(cart_id: string): Promise<CartItemModel[]> {
    return this.http.get<CartItemModel[]>(baseUrl+ "/api/cartsItems/" + cart_id).toPromise();
  }

  public addCartItemAsync(cartItemToAdd: CartItemModel): Promise<CartItemModel> {
    return this.http.post<CartItemModel>(baseUrl+ "/api/cartsItems",cartItemToAdd).toPromise();
  }

  public updateCartItemAsync(cartItemToUpdate: CartItemModel): Promise<CartItemModel> {
    return this.http.put<CartItemModel>(baseUrl+ "/api/cartsItems/"+cartItemToUpdate._id,cartItemToUpdate).toPromise();
  }

  public deleteCartItemAsync(cartItem_id: string): Promise<void> {
    return this.http.delete<void>(baseUrl+ "/api/cartsItems/" + cartItem_id).toPromise();
  }

}
