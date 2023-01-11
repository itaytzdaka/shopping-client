import { StoreService } from './../../../services/store.service';
import { store } from 'src/app/redux/store';
import { InviteService } from '../../../services/invite.service';
import { CityService } from '../../../services/city.service';
import { CityModel } from '../../../models/city.model';
import { InviteModel } from '../../../models/invite.model';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Unsubscribe } from 'redux';
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
  public dateToday = new Date();

  @Output()
  public setSearch = new EventEmitter<string>();

  constructor(
    private myInviteService: InviteService,
    private myStoreService: StoreService,
    private myCityService: CityService,
    private router: Router
  ) { }

  ngOnInit(): void {

    //listening to the store
    this.unsubscribe = store.subscribe(() => {
      this.getFromTheStore();
    });

    //get the data from the store
    this.getFromTheStore();
    this.getDataFromServer();

  }



  public getDataFromServer(): void {
    this.getCitiesAsync();
  }

  //get data from the store
  public getFromTheStore(): void {
    this.cities = store.getState().cities;

    this.inviteToAdd.userId = store.getState().user?._id;
    this.inviteToAdd.cityId = store.getState().user?.cityId;
    this.inviteToAdd.street = store.getState().user?.street;
    this.inviteToAdd.cartPrice = this.myStoreService.getUserOpenCartTotalPrice();
    this.inviteToAdd.cartId = this.myStoreService.getUserOpenCart()?._id;
  }

  //get the cities list
  public async getCitiesAsync() {
    try {
      if (!this.cities) {
        const cities = await this.myCityService.getAllCitiesAsync();
        this.myStoreService.saveCities(cities);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  //add new invite to DB and navigate user
  public async addOrderAsync() {
    try {
      this.inviteToAdd.orderDate = new Date().toJSON();
      const addedInvite = await this.myInviteService.addInviteAsync(this.inviteToAdd);
      this.myStoreService.addNewInvite(addedInvite);
      this.router.navigateByUrl("");
    }
    catch (err) {
      console.log(err);
    }
  }

  //search
  public userSearch(search: string): void {
    this.setSearch.emit(search); // Raising the event - העלאת ארוע
  }

  ngOnDestroy(): void {
    this.unsubscribe(); //stop listening to the store
  }
}
