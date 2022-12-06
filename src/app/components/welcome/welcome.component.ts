import { Unsubscribe } from 'redux';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { store } from './../../redux/store';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  private unsubscribe: Unsubscribe;
  public isLoggedIn: boolean;
  public user: UserModel;

  constructor(
    private myUserService: UserService
  ) { }

  ngOnInit(): void {
    // Listen to changes: 
    this.user = store.getState().user;
    this.isLoggedIn = store.getState().isLoggedIn;

    this.unsubscribe = store.subscribe(() => {
      this.user = store.getState().user;
      this.isLoggedIn = store.getState().isLoggedIn;
    });

  }

  public async disconnect(){
    console.log("disconnect");

    try{
      await this.myUserService.disconnectAsync();
    }
    catch(err){
      console.log(err);
    }
  }

}
