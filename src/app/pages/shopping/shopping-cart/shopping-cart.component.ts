import { MainService } from '../../../services/main.service';
import { UserService } from '../../../services/user.service';
import { ActionType } from 'src/app/redux/action-type';
import { store } from '../../../redux/store';
import { CartService } from '../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from '../../../models/cart-item.model';
import { CartModel } from 'src/app/models/cart.model';
import { CartItemService } from 'src/app/services/cart-item.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class CartComponent implements OnInit {

  private unsubscribe: Unsubscribe;
  public carts: CartModel[];
  public openCart: CartModel;
  public cartItems: CartItemModel[];
  public isCartEmpty: boolean;
  public isNewUser: boolean;
  public cartTotalPrice: number;

  constructor(
    private myCartService: CartService,
    private myCartItemService: CartItemService,
    private myUserService: UserService,
    private myMainService: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const isAdmin = store.getState().isAdmin;

    if (!isAdmin) {
      //get from the store
      this.carts = store.getState().cartsOfUser;
      this.cartItems = store.getState().cartItems;
      this.openCart = store.getState().openCart;
      this.isCartEmpty = store.getState().IsCartEmpty;
      this.cartTotalPrice = store.getState().cartTotalPrice;

      //listening to the store
      this.unsubscribe = store.subscribe(() => {
        this.openCart = store.getState().openCart;
        this.cartItems = store.getState().cartItems;
        this.isCartEmpty = store.getState().IsCartEmpty;
        this.cartTotalPrice = store.getState().cartTotalPrice;
      });

      //get the cart of user from DB or create a new cart if there is no open cart
      this.getOrCreateCartForUserAsync();
    }

  }

  public async getOrCreateCartForUserAsync() {
    //if the carts are empty, get data
    if (!this.carts) {
      await this.myMainService.saveCartsAndInvitesOfUserAsync();
    }

    console.log("this.openCart");
    console.log(this.openCart);

    //if the user don't have an open cart, create a new empty cart.
    if (!this.openCart) {

      let newCart=new CartModel();
      newCart= this.myMainService.createNewCartForUser();
      newCart= await this.myCartService.createNewCartAsync(newCart);
      
      
      store.dispatch({ type: ActionType.addNewCart, payload: newCart });
      store.dispatch({ type: ActionType.loadUserCart});
    }

  }


  public async deleteCartItemAsync(_id) {
    try {
      this.myCartItemService.deleteCartItemAsync(_id);
      store.dispatch({ type: ActionType.deleteCartItem, payload: _id });
    }
    catch (err) {
      console.log(err);
    }

  }

  public async deleteAllCartItemsAsync() {
    try {
      this.myMainService.deleteAllCartItemsAsync();
    }
    catch (err) {
      console.log(err);
    }
  }

  public async disconnect() {
    try {
      await this.myUserService.disconnectAsync();
    }
    catch (error) {
      console.log(error);
    }
  }

}
