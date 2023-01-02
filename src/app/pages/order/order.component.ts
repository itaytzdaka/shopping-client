import { InviteModel } from '../../models/invite.model';
import { ActionType } from 'src/app/redux/action-type';
import { InviteService } from '../../services/invite.service';
import { CityService } from '../../services/city.service';
import { MainService } from '../../services/main.service';
import { UserService } from '../../services/user.service';
import { store } from '../../redux/store';
import { Component, OnInit } from '@angular/core';
import { CartItemModel } from '../../models/cart-item.model';
import { CartModel } from 'src/app/models/cart.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  
  public menuOpen: boolean;
  public carts: CartModel[];
  public cartItems: CartItemModel[];
  public allInvitesDeliveryFromToday: InviteModel[];
  public search: string;

  constructor(
    private myMainService: MainService,
    private myCityService: CityService,
    private myInviteService: InviteService,
    private myUserService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    
    //get the menu status
    this.menuOpen = store.getState().MenuOpen;

    // //if user is not logged in
    // if (!this.myUserService.isLoggedIn()) {
    //   console.log("order check");
    //   this.router.navigateByUrl("/home/login");
    // }

    // //if logged in
    // else {
    //   //if user is admin
    //   if (this.myUserService.isAdmin()) {
    //     this.router.navigateByUrl("/admin");
    //   }
    //   //if regular user
    //   else {
    //     this.uploadFromDbToStoreAsync();
    //     this.router.navigateByUrl("/order");
    //   }
    // }

    this.uploadFromDbToStoreAsync();

  }

  public userSearch(search: string): void{
    this.search=search;
  }


  public async uploadFromDbToStoreAsync() {

    await this.getCartForUserAsync();

    //if it's a new User Or user with no cart open, navigate to home.
    if (!store.getState().cartItems) {
      this.router.navigateByUrl("/home");
    }

    await this.getCitiesAsync();
    await this.getAllDeliveryFromTodayAsync();

  }


  public async getCartForUserAsync() {
    //get and save the carts
    //get ans save the invites
    //if is there any cart open -> get the cart items
    await this.myMainService.saveCartsAndInvitesOfUserAsync();
  }

  //get the cities list
  public async getCitiesAsync() {
    try {
      const cities = await this.myCityService.getAllCitiesAsync();
      store.dispatch({ type: ActionType.saveCities, payload: cities });
    }
    catch (err) {
      console.log(err);
    }
  }

  public async getAllDeliveryFromTodayAsync(){
    try{
      const deliveryFromToday=await this.myInviteService.getAllDeliveryInvitesFromTodayAsync();
    }
    catch(err){
      console.log(err);
    }
  }

  //change the menu status
  public changeMenuStatus(): boolean{
    this.menuOpen=!this.menuOpen;
    return this.menuOpen;
  }

}
