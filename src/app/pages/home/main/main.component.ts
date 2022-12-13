import { store } from 'src/app/redux/store';
import { Component, OnInit } from '@angular/core';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {
  private unsubscribe: Unsubscribe;
  public numOfInvites: number;
  public numOfProducts: number;

  constructor(

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
    this.numOfProducts = store.getState().numOfProducts;
  }

  ngOnDestroy(): void {
    this.unsubscribe(); //stop listening to the store
  }
}
