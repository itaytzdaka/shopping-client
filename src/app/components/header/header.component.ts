import { StoreService } from './../../services/store.service';
import { store } from './../../redux/store';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public search: string;
  public menuOpen: boolean;
  private unsubscribe: Unsubscribe;

  @Output()
  public setSearch = new EventEmitter<string>();

  public userSearch(): void {
    this.setSearch.emit(this.search); // Raising the event
  }

  constructor(
    private myStoreService: StoreService
  ) { }

  ngOnInit(): void {

    // Listen to changes:
    this.unsubscribe = store.subscribe(() => {
      this.menuOpen = store.getState().menuOpen;
    });

    this.menuOpen = store.getState().menuOpen;
  }

  public changeMenuStatus(): void {
    this.myStoreService.changeMenuOpenStatus();
  }

  ngOnDestroy(): void {
    if (this.unsubscribe)
      this.unsubscribe(); //stop listening to the store
  }
}
