import { store } from './../../redux/store';
import { MainService } from './../../services/main.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unsubscribe } from 'redux';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

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

    this.myMainService.redirectUser("/home", "/admin/edit/chooseProduct");
  }


  public changeMenuStatus(): boolean {
    this.menuOpen = !this.menuOpen;
    return this.menuOpen;
  }

  ngOnDestroy(): void {
    if (this.unsubscribe)
      this.unsubscribe(); //stop listening to the store
  }

}
