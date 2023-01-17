import { store } from '../../../redux/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../services/user.service';
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
    private myUserService: UserService,
  ) { }

  ngOnInit(): void {

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.isLoggedIn = store.getState().isLoggedIn;
    });

    this.isLoggedIn = store.getState().isLoggedIn;

  }

  public async disconnect(): Promise<void>{
    try {
      await this.myUserService.disconnectAsync();
    }
    catch (err) {
      console.log(err);
    }
  }

  ngOnDestroy(): void {
    if(this.unsubscribe)
      this.unsubscribe(); //stop listening to the store
  }

}
