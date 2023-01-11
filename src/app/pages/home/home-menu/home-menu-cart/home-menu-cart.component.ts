import { StoreService } from './../../../../services/store.service';
import { MainService } from './../../../../services/main.service';
import { InviteModel } from './../../../../models/invite.model';
import { CartModel } from './../../../../models/cart.model';
import { Unsubscribe } from 'redux';
import { Component, OnInit } from '@angular/core';
import { store } from '../../../../redux/store';

@Component({
  selector: 'app-home-menu-cart',
  templateUrl: './home-menu-cart.component.html',
  styleUrls: ['./home-menu-cart.component.scss']
})
export class HomeMenuCartComponent implements OnInit {

  private unsubscribe: Unsubscribe;
  public cartsOfUser: CartModel[];
  public openCart: CartModel;
  public lastInvite: InviteModel;
  public cartNumberOfProducts: number;
  public cartTotalPrice: number;
  public orderCompleted: boolean;

  constructor(
    private myMainService: MainService,
    private myStoreService: StoreService
  ) { }

  ngOnInit(): void {

    this.unsubscribe = store.subscribe(() => {
      this.getDataFromStore();
    });

    this.getDataFromStore();
    this.myMainService.getUserCartsAndInvitesAndOpenCartItemsAndSaveAtStoreAsync();

  }

  public getDataFromStore(): void {

    this.cartsOfUser = store.getState().cartsOfUser;
    this.orderCompleted = store.getState().orderCompleted;

    this.lastInvite = this.myStoreService.getLastInvite();
    this.openCart = this.myStoreService.getUserOpenCart();
    this.cartNumberOfProducts = this.myStoreService.getNumOfProductsFromUserOpenCartItems();
    this.cartTotalPrice = this.myStoreService.getUserOpenCartTotalPrice();
  }

}
