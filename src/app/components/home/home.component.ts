import { store } from 'src/app/redux/store';
import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { ActionType } from "src/app/redux/action-type";

import { ProductService } from './../../services/product.service';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from './../../services/cart.service';
import { CartModel } from 'src/app/models/cart.model';
import { UserService } from './../../services/user.service';
import { UserModel } from 'src/app/models/user.model';
import { InviteService } from './../../services/invite.service';
import { InviteModel } from 'src/app/models/invite.model';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { CartItemService } from './../../services/cart-item.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // events: string[] = [];
  public menuOpen: boolean;

  constructor(
    private myInviteService: InviteService,
    private myProductService: ProductService,
    private myUserService: UserService,
    private myMainService: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {

    //get the menu status
    this.menuOpen=store.getState().MenuOpen;

    //if the user logged in
    if (this.myUserService.isLoggedIn()) {

      //if is admin, navigate to /admin page
      if (this.myUserService.isAdmin()) {
        this.router.navigateByUrl("/admin");
      }
      //if is regular user, navigate to home
      else {
        //get the carts, invites, calculate if is there open cart, and if it's a new user.
        this.myMainService.saveCartsAndInvitesOfUserAsync();
        this.router.navigateByUrl("/home");
      }
    }

    //if not logged in, navigate to login page
    else {
      this.router.navigateByUrl("/home/login");
    }

    //if the store is empty, get the data from DB and save in the store
    if (!store.getState().numOfInvites || !store.getState().numOfProducts) {
      this.saveInTheStoreAsync();
    }

  }

  public async saveInTheStoreAsync() {
    try {
      this.myInviteService.getNumOfInvitesWithReduxAsync();
      this.myProductService.getNumOfProductsWithReduxAsync();
    }
    catch (err) {
      alert(err.message);
    }
  }

  public changeMenuStatus(): boolean{
    this.menuOpen=!this.menuOpen;
    return this.menuOpen;
  }
}
