import { Injectable } from '@angular/core';
import { CartModel } from './../models/cart.model';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }


  public getAllCartsOfUserAsync(user_id: string): Promise<CartModel[]> {
    return this.http.get<CartModel[]>("http://localhost:3000/api/carts/" + user_id).toPromise();
  }

  public addNewCartAsync(cartToAdd: CartModel): Promise<CartModel> {
    return this.http.post<CartModel>("http://localhost:3000/api/carts", cartToAdd).toPromise();
  }

}
