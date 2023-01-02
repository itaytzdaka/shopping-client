
import { store } from '../../../redux/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { MainService } from '../../../services/main.service';

import { UserModel } from 'src/app/models/user.model';
import { CartModel } from 'src/app/models/cart.model';
import { InviteModel } from 'src/app/models/invite.model';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';


@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class MenuComponent implements OnInit {

  private unsubscribe: Unsubscribe;
  public user: UserModel;
  public isLoggedIn: boolean;
  public openCart: CartModel;
  public lastInvite: InviteModel;
  public noCarts: boolean;
  public cartNumberOfItems: number;
  public cartTotalPrice: number;

  constructor(
    private myUserService: UserService,
    private myMainService: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {


    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      console.log("onSubscribe");

      this.isLoggedIn = store.getState().isLoggedIn;

      if(this.isLoggedIn){
        this.getData();
      }
    });


    // console.log(store.getState().isLoggedIn);

    this.isLoggedIn = store.getState().isLoggedIn;
    if(this.isLoggedIn){
      this.getData();
    }
  }

  public getData(): void {

    // if(!store.getState().cartsOfUser && !store.getState().invitesOfUser && store.getState().numOfInvites && store.getState().numOfProducts){
    if(!store.getState().cartsOfUser && !store.getState().invitesOfUser){
      this.myMainService.saveCartsAndInvitesOfUserAsync();
    }

    //if the store isn't empty, get the data from store.
    else{
      this.user = store.getState().user;
      this.openCart = store.getState().openCart;
      this.lastInvite = store.getState().lastInvite;
      this.noCarts = store.getState().noCarts;
      this.cartNumberOfItems = store.getState().cartNumberOfItems;
      this.cartTotalPrice = store.getState().cartTotalPrice;
    }

  }

  ngOnDestroy(): void {
    this.unsubscribe(); // הפסק להאזין אם הרכיב שלנו נהרס
  }

  public async disconnect(){
    console.log("disconnect");

    try{
      await this.myUserService.disconnectAsync();
    }
    catch(err){
      console.log(err);
    }
  }

}
