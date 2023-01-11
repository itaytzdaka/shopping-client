import { Injectable } from '@angular/core';
import { CartModel } from './../models/cart.model';
import { HttpClient } from "@angular/common/http";
import { ActionType } from "src/app/redux/action-type";
import { store } from "src/app/redux/store";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }


  public getAllCartsOfUserAsync(_id): Promise<CartModel[]> {
    return this.http.get<CartModel[]>("http://localhost:3000/api/carts/" + _id).toPromise();
  }

  public addNewCartAsync(cart): Promise<CartModel> {
    return this.http.post<CartModel>("http://localhost:3000/api/carts", cart).toPromise();
  }

}
