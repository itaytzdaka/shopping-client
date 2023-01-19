import { StoreService } from './../../../services/store.service';
import { MainService } from '../../../services/main.service';
import { UserService } from '../../../services/user.service';
import { store } from '../../../redux/store';
import { CartService } from '../../../services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from '../../../models/cart-item.model';
import { CartItemService } from 'src/app/services/cart-item.service';
import { baseUrl } from 'src/environments/environment';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  private unsubscribe: Unsubscribe;

  public cartItems: CartItemModel[];
  public cartTotalPrice: number;
  public baseUrl=baseUrl;

  constructor(
    private myCartService: CartService,
    private myCartItemService: CartItemService,
    private myMainService: MainService,
    private myStoreService: StoreService
  ) { }

  ngOnInit(): void {

    if(!store.getState().isLoggedIn)
      return;

      //listening to the store
      this.unsubscribe = store.subscribe(() => {
        this.getDataFromTheStore()
      });

      this.getDataFromTheStore()
      this.getDataFromTheServer()
  }


  public getDataFromTheStore(): void {
    this.cartItems = store.getState().cartItems;
    this.cartTotalPrice = this.myStoreService.getUserOpenCartTotalPrice();
  }

  public async getDataFromTheServer(): Promise<void>{
    await this.myMainService.getUserCartsAndInvitesAndOpenCartItemsAndSaveAtStoreAsync();
    await this.createNewCartForUserIfNeeded();
  }




  public async createNewCartForUserIfNeeded(): Promise<void> {

    const userOpenCart = this.myStoreService.getUserOpenCart();

    //if the user don't have an open cart, create a new empty cart.
    if (!userOpenCart) {
      let newCart = this.myMainService.createNewCartForUser();
      newCart = await this.myCartService.addNewCartAsync(newCart);
      this.myStoreService.addNewCartForUser(newCart);
    }
  }


  public async deleteCartItemAsync(_id: string): Promise<void> {
    try {
      await this.myCartItemService.deleteCartItemAsync(_id);
      this.myStoreService.deleteCartItemFromUserOpenCart(_id);
    }
    catch (error) {
      this.myMainService.errorHandling(error);
    }

  }

  public async deleteAllCartItemsAsync(): Promise<void> {
    try {
      this.myMainService.deleteAllCartItemsAsync();
    }
    catch (error) {
      this.myMainService.errorHandling(error);
    }
  }

  ngOnDestroy(): void {
    if(this.unsubscribe)
      this.unsubscribe(); //stop listening to the store
  }

}
