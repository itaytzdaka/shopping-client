import { MainService } from './../../../services/main.service';
import { store } from '../../../redux/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from 'redux';


@Component({
  selector: 'app-home-menu',
  templateUrl: './home-menu.component.html',
  styleUrls: ['./home-menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  private unsubscribe: Unsubscribe;
  public isLoggedIn: boolean;

  constructor(
    private myMainService: MainService,
  ) { }

  ngOnInit(): void {

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.isLoggedIn = store.getState().isLoggedIn;
    });

    this.isLoggedIn = store.getState().isLoggedIn;

  }

  ngOnDestroy(): void {
    if(this.unsubscribe)
      this.unsubscribe(); //stop listening to the store
  }

}
