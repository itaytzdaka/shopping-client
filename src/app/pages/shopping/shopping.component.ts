import { store } from './../../redux/store';
import { MainService } from './../../services/main.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit, OnDestroy {

  public menuOpen: boolean = true;
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

    //redirect user to the right place
    this.myMainService.redirectUser("/shopping/all", "/admin");
  }


  ngOnDestroy(): void {
    if (this.unsubscribe)
      this.unsubscribe(); //stop listening to the store
  }

}
