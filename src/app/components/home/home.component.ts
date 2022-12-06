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
    console.log("ngOnInit home");


    //get the menu status
    this.menuOpen = store.getState().MenuOpen;

    this.myUserService.redirectUser("/home","/admin");

    // this.navigate();

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
      console.log(err.message);
    }
  }

  public changeMenuStatus(): boolean {
    this.menuOpen = !this.menuOpen;
    return this.menuOpen;
  }
}
