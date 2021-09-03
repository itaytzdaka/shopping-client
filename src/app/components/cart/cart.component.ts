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
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
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

    //if user is loggedIn and not admin
    if (this.myUserService.isLoggedIn() && !this.myUserService.isAdmin()) {
      //get from the store
      this.carts = store.getState().carts;
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
    //if the store is empty
    if (!this.carts) {
      await this.myMainService.saveCartsAndInvitesOfUserAsync();
    }

    //if it's a new User Or user with no cart open
    if (!this.openCart) {
      store.dispatch({ type: ActionType.addNewCart });
      this.myCartService.createNewCartAsync(this.openCart);
    }

  }


  public async deleteCartItemAsync(_id){
    try{
      this.myCartItemService.deleteCartItemAsync(_id);
      store.dispatch({ type: ActionType.deleteCartItem , payload: _id });
    }
    catch(err){
      console.log(err);
    }
    
  }

  public async deleteAllCartItemsAsync(){
    try{
      this.myMainService.deleteAllCartItemsAsync();
    }
    catch(err){
      console.log(err);
    }
  }

  public disconnect(): void{
    this.myUserService.disconnect();
  }

}
