import { Unsubscribe } from 'redux';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { store } from './../../redux/store';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  private unsubscribe: Unsubscribe;
  public isLoggedIn: boolean;
  public user: UserModel;


  constructor(
    private myUserService: UserService
  ) { }

  ngOnInit(): void {

    // Listen to changes:
    this.unsubscribe = store.subscribe(() => {
      this.getDataFromTheStore();
    });

    this.getDataFromTheStore();
  }

  public getDataFromTheStore(): void{
    this.user = store.getState().user;
    this.isLoggedIn = store.getState().isLoggedIn;
  }

  public async disconnect(): Promise<void>{
    try{
      await this.myUserService.disconnectAsync();
    }
    catch(err){
      console.log(err);
    }
  }

  ngOnDestroy(): void {
    if(this.unsubscribe)
      this.unsubscribe(); //stop listening to the store
  }

}
