import { StoreService } from './../../../services/store.service';
import { MainService } from '../../../services/main.service';
import { UserService } from '../../../services/user.service';
import { store } from '../../../redux/store';
import { Component, OnInit, Input } from '@angular/core';
import { Unsubscribe } from 'redux';
import { CartItemModel } from '../../../models/cart-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-cart',
  templateUrl: './order-cart.component.html',
  styleUrls: ['./order-cart.component.scss']
})
export class FinalCartComponent implements OnInit {

  private unsubscribe: Unsubscribe;

  public userOpenCartItems: CartItemModel[];
  public cartTotalPrice: number;
  @Input()
  public search: string;

  constructor(
    private myUserService: UserService,
    private myStoreService: StoreService,
    private myMainService: MainService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {

    //listening to the store
    this.unsubscribe = store.subscribe(() => {
      this.getDataFromStore();
    });

    this.getDataFromStore();
    await this.getDataFromServer();

    //if the user with no cart open, navigate to home.
    if (!store.getState().cartItems) {
      this.router.navigateByUrl("/home");
    }
  }

  //get data from the server
  public async getDataFromServer(){
    await this.myMainService.getUserCartsAndInvitesAndOpenCartItemsAndSaveAtStoreAsync();
  }

  //get data from the store
  public getDataFromStore(): void {
    this.cartTotalPrice = this.myStoreService.getUserOpenCartTotalPrice();
    this.userOpenCartItems = store.getState().cartItems;
  }

  //disconnect user
  public disconnect(): void {
    this.myUserService.disconnectAsync();
  }

}
