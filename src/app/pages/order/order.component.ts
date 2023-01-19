import { store } from './../../redux/store';
import { MainService } from './../../services/main.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public menuOpen: boolean = true;
  public search: string;
  private unsubscribe: Unsubscribe;

  constructor(
    private myMainService: MainService
  ) { }

  ngOnInit(): void {

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.menuOpen = store.getState().menuOpen;
    });

    this.menuOpen = store.getState().menuOpen;

    //redirect user
    this.myMainService.redirectUser("/order", "/admin");

  }

  public userSearch(search: string): void {
    this.search = search;
  }

  ngOnDestroy(): void {
    if (this.unsubscribe)
      this.unsubscribe(); //stop listening to the store
  }

}
