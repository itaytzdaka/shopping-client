import { store } from './../../redux/store';
import { MainService } from './../../services/main.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public menuOpen: boolean;
  private unsubscribe: Unsubscribe;

  constructor(
    private myMainService: MainService,
  ) { }

  ngOnInit(): void {

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.menuOpen = store.getState().menuOpen;
    });

    this.menuOpen = store.getState().menuOpen;

    //redirect user
    this.myMainService.redirectUser("/home", "/admin");

  }


  ngOnDestroy(): void {
    if (this.unsubscribe)
      this.unsubscribe(); //stop listening to the store
  }
}
