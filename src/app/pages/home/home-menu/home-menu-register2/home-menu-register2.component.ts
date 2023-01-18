import { StoreService } from './../../../../services/store.service';
import { MainService } from '../../../../services/main.service';
import { CityService } from '../../../../services/city.service';
import { store } from '../../../../redux/store';
import { UserService } from '../../../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { CityModel } from 'src/app/models/city.model';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-home-menu-register2',
  templateUrl: './home-menu-register2.component.html',
  styleUrls: ['./home-menu-register2.component.scss']
})
export class Register2Component implements OnInit, OnDestroy {

  private unsubscribe: Unsubscribe;
  public newUser: UserModel;
  public cities: CityModel[];

  constructor(
    private myUserService: UserService,
    private myCityService: CityService,
    private myMainService: MainService,
    private myStoreService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.getDataFromTheStore();
    });

    this.getDataFromTheStore();

    //if the user didn't fill step 1, navigate to login.
    if (!this.newUser?.identityNumber) {
      this.router.navigateByUrl("/home/login");
      return;
    }

    this.getDataFromTheServer();
  }

  public getDataFromTheStore(): void {
    this.newUser = store.getState().newUser;
    this.cities = store.getState().cities;
  }

  public getDataFromTheServer(){
    this.getCitiesAsync();
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

  //register and login
  public async registerNewUserAsync(): Promise<void> {
    try {
      const addedUser = await this.myUserService.registerAsync(this.newUser);
      this.myMainService.loginAndNavigateAsync(addedUser);
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
