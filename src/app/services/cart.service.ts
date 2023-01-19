import { Injectable } from '@angular/core';
import { CartModel } from './../models/cart.model';
import { HttpClient } from "@angular/common/http";
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }


  public getAllCartsOfUserAsync(user_id: string): Promise<CartModel[]> {
    return this.http.get<CartModel[]>(baseUrl+ "/api/carts/" + user_id).toPromise();
  }

  public addNewCartAsync(cartToAdd: CartModel): Promise<CartModel> {
    return this.http.post<CartModel>(baseUrl+ "/api/carts", cartToAdd).toPromise();
  }

}
