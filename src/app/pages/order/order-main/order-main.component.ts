import { ImageService } from '../../../services/image.service';
import { UserService } from '../../../services/user.service';
import { MainService } from '../../../services/main.service';
import { CartModel } from 'src/app/models/cart.model';
import { store } from 'src/app/redux/store';
import { InviteService } from '../../../services/invite.service';
import { CityService } from '../../../services/city.service';
import { CityModel } from '../../../models/city.model';
import { InviteModel } from '../../../models/invite.model';
import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';
import { ActionType } from 'src/app/redux/action-type';
import { CartItemModel } from 'src/app/models/cart-item.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-main',
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.scss']
})
export class AddInviteComponent implements OnInit {

  private unsubscribe: Unsubscribe;
  public inviteToAdd = new InviteModel();
  public cities: CityModel[];
  public cartItems: CartItemModel[];
  public selectedFile: File = null;
  public dateToday = new Date();

  constructor(
    private myInviteService: InviteService,
    private myImageUploadService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {

    //listening to the store
    this.unsubscribe = store.subscribe(() => {
      this.getFromTheStore();
    });

    //get the data from the store
    this.getFromTheStore();
  }

  //add new invite to DB
  public async addOrderAsync(){
    try {
      this.inviteToAdd.orderDate = new Date().toJSON();
      console.log("this.myInviteService.addInviteAsync(this.inviteToAdd);");
      const addedInvite = await this.myInviteService.addInviteAsync(this.inviteToAdd);
      store.dispatch({ type: ActionType.addNewInvite, payload: addedInvite });
      this.router.navigateByUrl("");
    }
    catch (err) {
      console.log(err);
    }
  }

  //get data from the store
  public getFromTheStore(): void {
    if (store.getState().carts && store.getState().isLoggedIn) {
      this.cities = store.getState().cities;
      this.cartItems = store.getState().cartItems;
      this.inviteToAdd.userId = store.getState().user._id;
      this.inviteToAdd.cartPrice = store.getState().cartTotalPrice;
      this.inviteToAdd.cityId = store.getState().user.cityId;
      this.inviteToAdd.street = store.getState().user.street;
      if (store.getState().openCart) {
        this.inviteToAdd.cartId = store.getState().openCart._id;
      }
    }
  }

  //when user choose a file
  public onFileSelected(event): void {
    this.selectedFile = <File>event.target.files[0];
  }

  ngOnDestroy(): void {
    this.unsubscribe(); //stop listening to the store
  }
}
