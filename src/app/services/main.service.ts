import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';

import { ProductService } from './product.service';
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
    private myProductService: ProductService,
    private myUserService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  public async loginAndNavigateAsync(user) {
    try {
      //get user details and token
      const response = await this.myUserService.loginAsync(user);

      this.saveUserAtCookieAndStore(response.user);

      //redirect
      if (response.user.isAdmin) {
        this.router.navigateByUrl("/admin/edit/chooseProduct");
      }
      else {
        console.log("/home")
        this.router.navigateByUrl("/home");
      }
    } catch (error) {
      alert(error.error);
    }

  }

  public saveUserAtCookieAndStore(user) {
    store.dispatch({ type: ActionType.login, payload: user });
    this.saveCookie("user", user);
  }

  // public navigate(user) {
  //   const url=this.router.url;

  //   if(!user){
  //     this.router.navigateByUrl("/home/login");
  //   }

  //   if (user.isAdmin) {
  //     this.router.navigateByUrl("/admin/edit/chooseProduct");
  //   }
  //   else {
  //     this.saveCartsAndInvitesOfUserAsync();
  //     this.router.navigateByUrl("/home");
  //   }


  // }

  public saveCookie(name, data) {
    //save user as cookie
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    this.cookieService.set('user', JSON.stringify(data),d,"/");
    console.log("JSON.parse(this.cookieService.get('user'))");
    console.log(JSON.parse(this.cookieService.get('user')));
    document.cookie = name + "1=" + JSON.stringify(data) + "; expires=" + d.toUTCString()+";Path=/;"; 
  }

  //get and save the carts
  //get ans save the invites
  //if is there any cart open -> get the cart items
  public async saveCartsAndInvitesOfUserAsync() {
    try {
      console.log("saveCartsAndInvitesOfUserAsync");
      const carts = await this.myCartService.getAllCartsOfUserAsync(store.getState().user._id);
      const invites = await this.myInviteService.getAllInvitesOfUserAsync(store.getState().user._id);
      store.dispatch({ type: ActionType.saveCarts, payload: carts });
      store.dispatch({ type: ActionType.saveInvites, payload: invites });
      store.dispatch({ type: ActionType.loadUserCart });
      if (store.getState().openCart) {
        const cartItems = await this.myCartItemService.getAllCartItemsAsync(store.getState().openCart._id);
        store.dispatch({ type: ActionType.saveCartItems, payload: cartItems });
      }
    } 
    
    catch (error) {
      if(error.error=="You are not logged-in"){
        this.myUserService.disconnectAsync();
      }
      console.log(error);
    }
  }

  public deleteAllCartItemsAsync() {
    store.getState().cartItems.forEach(async item => {
      try {
        await this.myCartItemService.deleteCartItemAsync(item._id);
      }
      catch (err) {
        if(err.error=="You are not logged-in"){
          this.myUserService.disconnectAsync();
        }
        console.log(err);
      }
    });
    store.dispatch({ type: ActionType.deleteAllCartItems });
  }


}
