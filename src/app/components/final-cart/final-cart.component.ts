import { MainService } from './../../services/main.service';
import { UserService } from './../../services/user.service';
import { ActionType } from 'src/app/redux/action-type';
import { store } from './../../redux/store';
import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from './../../models/cart-item.model';
import { CartModel } from 'src/app/models/cart.model';
import { CartItemService } from 'src/app/services/cart-item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-final-cart',
  templateUrl: './final-cart.component.html',
  styleUrls: ['./final-cart.component.scss']
})
export class FinalCartComponent implements OnInit {

  private unsubscribe: Unsubscribe;

  public cartItems: CartItemModel[];
  public cartTotalPrice: number;
  public search: string;

  constructor(
    private myUserService: UserService,

  ) { }

  ngOnInit(): void {


    //listening to the store
    this.unsubscribe = store.subscribe(() => {
      this.getFromStore();
    });

    this.getFromStore();

  }

  //get data from the store
  public getFromStore(): void {
    this.cartTotalPrice = store.getState().cartTotalPrice;
    this.cartItems = store.getState().cartItems;
  }

  public disconnect() {
    this.myUserService.disconnectAsync();
  }

}
