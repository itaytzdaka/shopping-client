import { StoreService } from './../../../services/store.service';
import { store } from 'src/app/redux/store';
import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.scss']
})

export class MainComponent implements OnInit {
  private unsubscribe: Unsubscribe;
  public numOfInvites: number;
  public numOfProducts: number;
  public search: string;

  constructor(
    private myStoreService: StoreService
  ) { }

  ngOnInit(): void {

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.getFromTheStore();
    });

    this.getFromTheStore();
  }

  //get data from the store
  public getFromTheStore(): void{
    this.numOfInvites = store.getState().numOfInvites;
    this.numOfProducts = this.myStoreService.getNumOfProducts();
  }

  ngOnDestroy(): void {
    this.unsubscribe(); //stop listening to the store
  }
}
