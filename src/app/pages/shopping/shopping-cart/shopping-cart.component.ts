import { StoreService } from './../../../services/store.service';
import { MainService } from '../../../services/main.service';
import { UserService } from '../../../services/user.service';
import { store } from '../../../redux/store';
import { CartService } from '../../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from '../../../models/cart-item.model';
import { CartItemService } from 'src/app/services/cart-item.service';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class CartComponent implements OnInit {

  private unsubscribe: Unsubscribe;

  public cartItems: CartItemModel[];
  public cartTotalPrice: number;

  constructor(
    private myCartService: CartService,
    private myCartItemService: CartItemService,
    private myUserService: UserService,
    private myMainService: MainService,
    private myStoreService: StoreService
  ) { }

  async ngOnInit(): Promise<void> {

    const isAdmin = store.getState().isAdmin;

    if (!isAdmin) {

      //listening to the store
      this.unsubscribe = store.subscribe(() => {
        this.getDataFromStore()
      });

      this.getDataFromStore()
      this.getDataFromServer()

    }

  }


  public getDataFromStore() {
    this.cartItems = store.getState().cartItems;
    this.cartTotalPrice = this.myStoreService.getUserOpenCartTotalPrice();
  }

  public async getDataFromServer(){
    await this.myMainService.getUserCartsAndInvitesAndOpenCartItemsAndSaveAtStoreAsync();
    await this.createNewCartForUserIfNeeded();
  }




  public async createNewCartForUserIfNeeded() {

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
    catch (err) {
      console.log(err);
    }

  }

  public async deleteAllCartItemsAsync(): Promise<void> {
    try {
      this.myMainService.deleteAllCartItemsAsync();
    }
    catch (err) {
      console.log(err);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await this.myUserService.disconnectAsync();
    }
    catch (error) {
      console.log(error);
    }
  }

}
