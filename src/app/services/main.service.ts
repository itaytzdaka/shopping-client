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
    private router: Router
  ) { }

  public async loginAndNavigateAsync(user){
    
    const response=await this.myUserService.loginAsync(user);
    store.dispatch({ type: ActionType.login, payload: response.user });
    sessionStorage.setItem("user", JSON.stringify(response.user));
    sessionStorage.setItem("token", response.token);

    if(response.user.isAdmin){
      this.router.navigateByUrl("/admin/edit/chooseProduct");
    }
    else{
      this.saveCartsAndInvitesOfUserAsync();
      this.router.navigateByUrl("/home");
    }
  }

  //get and save the carts
  //get ans save the invites
  //if is there any cart open -> get the cart items
  public async saveCartsAndInvitesOfUserAsync() {
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

  public  deleteAllCartItemsAsync(){
    store.getState().cartItems.forEach(async item=>{
      try{
        await this.myCartItemService.deleteCartItemAsync(item._id);
      }
      catch(err){
        console.log(err);
      }
    });
    store.dispatch({ type: ActionType.deleteAllCartItems });
  }

 
}
