import { UserModel } from './../models/user.model';
import { StoreService } from './store.service';
import { CartModel } from './../models/cart.model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { store } from '../redux/store';

import { InviteService } from './invite.service';
import { CartItemService } from './cart-item.service';
import { CartService } from './cart.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(
    private myCartService: CartService,
    private myCartItemService: CartItemService,
    private myInviteService: InviteService,
    private myStoreService: StoreService,
    private myUserService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  public async loginAndNavigateAsync(user: UserModel): Promise<void> {
    try {
      //get user details and token
      const response = await this.myUserService.loginAsync(user);

      this.saveUserAtCookieAndStore(response.user);

      //redirect
      if (response.user.isAdmin) {
        this.router.navigateByUrl("/admin/edit/chooseProduct");
      }
      else {
        this.router.navigateByUrl("/home");
      }
    } catch (error) {
      alert(error.error);
    }

  }

  //save user data at the cookie
  public saveUserAtCookieAndStore(user: UserModel): void {
    this.myStoreService.loginUser(user);

    //save user as cookie
    this.saveCookie("user", user);
  }

  //save a cookie
  public saveCookie(name: string, data: any): void {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    this.cookieService.set('user', JSON.stringify(data), d, "/");
    document.cookie = name + "1=" + JSON.stringify(data) + "; expires=" + d.toUTCString() + ";Path=/;";
  }

  public async getUserCartsAndInvitesAndOpenCartItemsAndSaveAtStoreAsync(): Promise<void> {
    await this.getCartsAndInvitesOfUserAndSaveAtStoreAsync();
    await this.getOpenCartItemsAndSaveAtStoreAsync();
  }


  //if the store is empty, get the carts and invites of user and save at store
  public async getCartsAndInvitesOfUserAndSaveAtStoreAsync(): Promise<void> {

    try {

      if(!store.getState().user)
        return;

      if(!store.getState().cartsOfUser){
        console.log("store.getState().cartsOfUser");
        console.log(store.getState().cartsOfUser);
        const cartsOfUser = await this.myCartService.getAllCartsOfUserAsync(store.getState().user?._id);
        console.log("cartsOfUser");
        console.log(cartsOfUser);
        this.myStoreService.saveCartsOfUser(cartsOfUser);
      }

      if(!store.getState().invitesOfUser){
        const invitesOfUser = await this.myInviteService.getAllInvitesOfUserAsync(store.getState().user?._id);
        this.myStoreService.saveInvitesOfUser(invitesOfUser);
      }

    }

    catch (error) {
      if (error.error == "You are not logged-in") {
        this.myUserService.disconnectAsync();
      }
      console.log(error);
    }
  }

  //if is there any cart open -> get the cart items
  public async getOpenCartItemsAndSaveAtStoreAsync(): Promise<void> {

    try {
      const userOpenCart = this.myStoreService.getUserOpenCart();

      if (userOpenCart && !store.getState().cartItems) {
        const userOpenCartItems = await this.myCartItemService.getAllCartItemsAsync(userOpenCart._id);
        this.myStoreService.saveUserOpenCartItems(userOpenCartItems);
      }
    }

    catch (error) {
      if (error.error == "You are not logged-in") {
        this.myUserService.disconnectAsync();
      }
      console.log(error);
    }

  }

  //delete all items in user open cart
  public deleteAllCartItemsAsync() {
    store.getState().cartItems.forEach(async item => {
      try {
        await this.myCartItemService.deleteCartItemAsync(item._id);
        this.myStoreService.deleteAllCartItemsFromUserOpenCart();
      }
      catch (err) {
        if (err.error == "You are not logged-in") {
          this.myUserService.disconnectAsync();
        }
        console.log(err);
      }
    });
  }

  //create a new cart for user
  public createNewCartForUser(): CartModel {
    const newCart = new CartModel();
    newCart.userId = store.getState().user._id;
    newCart.date = (new Date()).toJSON();

    return newCart;
  }

}
