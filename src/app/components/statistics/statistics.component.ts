import { MainService } from './../../services/main.service';
import { StoreService } from './../../services/store.service';
import { ProductService } from './../../services/product.service';
import { InviteService } from './../../services/invite.service';
import { store } from './../../redux/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {

  public unsubscribe: Unsubscribe;
  public numOfInvites: number;
  public numOfProducts: number;

  constructor(
    private myInviteService: InviteService,
    private myProductsService: ProductService,
    private myStoreService: StoreService,
    private myMainService: MainService
  ) { }

  ngOnInit(): void {

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.getDataFromTheStore();
    });

    this.getDataFromTheStore();
    this.getDataFromTheServer();

  }


  public getDataFromTheStore(): void {
    this.numOfInvites = store.getState().numOfInvites;
    this.numOfProducts = store.getState().numOfProducts;
  }

  public getDataFromTheServer(): void {
    this.getNumOfInvites();
    this.getNumOfProducts();
  }


  //get num of invites from DB
  public async getNumOfInvites(): Promise<void> {
    try {
      if (!this.numOfInvites) {
        const numOfInvites =await this.myInviteService.getNumOfInvitesAsync();
        this.myStoreService.saveNumOfInvites(numOfInvites);
      }
    } catch (error) {
      this.myMainService.errorHandling(error);
    }
  }

  //get num of products from DB
  public async getNumOfProducts(): Promise<void> {
    try {
      if (!this.numOfProducts) {
        const numOfProducts = await this.myProductsService.getNumOfProductsAsync();
        this.myStoreService.saveNumOfProducts(numOfProducts);
      }

    } catch (error) {
      this.myMainService.errorHandling(error);
    }
  }

  ngOnDestroy(): void {
    if(this.unsubscribe)
      this.unsubscribe(); //stop listening to the store
  }
}
