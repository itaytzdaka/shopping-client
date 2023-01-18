import { MainService } from './../../../services/main.service';
import { StoreService } from './../../../services/store.service';
import { store } from 'src/app/redux/store';
import { InviteService } from '../../../services/invite.service';
import { CityService } from '../../../services/city.service';
import { CityModel } from '../../../models/city.model';
import { InviteModel } from '../../../models/invite.model';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Unsubscribe } from 'redux';
import { Router } from '@angular/router';


@Component({
  selector: 'app-order-main',
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.scss']
})
export class AddInviteComponent implements OnInit, OnDestroy {

  private unsubscribe: Unsubscribe;
  public inviteToAdd = new InviteModel();
  public cities: CityModel[];
  public dateToday = new Date();

  @Output()
  public setSearch = new EventEmitter<string>();

  constructor(
    private myInviteService: InviteService,
    private myStoreService: StoreService,
    private myCityService: CityService,
    private myMainService: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {

    if(!store.getState().isLoggedIn)
    return;

    //listening to the store
    this.unsubscribe = store.subscribe(() => {
      this.getDataFromTheStore();
    });

    //get the data from the store
    this.getDataFromTheStore();
    this.getDataFromTheServer();

  }



  public getDataFromTheServer(): void {
    this.getCitiesAsync();
  }

  //get data from the store
  public getDataFromTheStore(): void {
    this.cities = store.getState().cities;

    this.inviteToAdd.userId = store.getState().user?._id;
    this.inviteToAdd.cityId = store.getState().user?.cityId;
    this.inviteToAdd.street = store.getState().user?.street;
    this.inviteToAdd.cartPrice = this.myStoreService.getUserOpenCartTotalPrice();
    this.inviteToAdd.cartId = this.myStoreService.getUserOpenCart()?._id;
  }

  //get the cities list
  public async getCitiesAsync(): Promise<void> {
    try {
      if (!this.cities) {
        const cities = await this.myCityService.getAllCitiesAsync();
        this.myStoreService.saveCities(cities);
      }
    }
    catch (error) {
      this.myMainService.errorHandling(error);
    }
  }

  //add new invite to DB and navigate user
  public async addOrderAsync(): Promise<void> {
    try {
      this.inviteToAdd.orderDate = new Date().toJSON();
      const addedInvite = await this.myInviteService.addInviteAsync(this.inviteToAdd);
      this.myStoreService.addNewInvite(addedInvite);
      this.router.navigateByUrl("");
    }
    catch (error) {
      this.myMainService.errorHandling(error);
    }
  }

  //search
  public userSearch(search: string): void {
    this.setSearch.emit(search); // Raising the event - העלאת ארוע
  }

  ngOnDestroy(): void {
    if(this.unsubscribe)
      this.unsubscribe(); //stop listening to the store
  }
}
