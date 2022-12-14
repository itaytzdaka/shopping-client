import { ActionType } from 'src/app/redux/action-type';
import { store } from '../../../../redux/store';
import { Unsubscribe } from 'redux';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';

@Component({
  selector: 'app-home-menu-register1',
  templateUrl: './home-menu-register1.component.html',
  styleUrls: ['./home-menu-register1.component.scss']
})
export class Register1Component implements OnInit {

  private unsubscribe: Unsubscribe;
  public newUser: UserModel;
  public allEmails: string[];
  public passwordsMatch: boolean;
  public confirmPassword: string;

  constructor(
    private myUserService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.getFromStore();
    this.getAllEmailsAsync();
  }



  public getFromStore(): void {
    this.newUser = store.getState().newUser;
  }

  public navigateToStep2(): void {
    store.dispatch({ type: ActionType.saveNewUser, payload: this.newUser });
    this.router.navigateByUrl("/home/register/2");
  }

  public async getAllEmailsAsync() {
    try {
      const allEmails = await this.myUserService.getAllEmailsAsync();
      this.allEmails = allEmails;
    }
    catch (err) {
      console.log(err);
    }
  }

  public PasswordsDoNotMatch() {

    if (this.newUser.password) {
      if (this.confirmPassword === this.newUser.password) {
        this.passwordsMatch = true;
        return false;
      }

      else {
        this.passwordsMatch = false;
        return true;
      }
    }
    else {
      return false;
    }

  }

  public isEmailExist() {
    if (this.allEmails) {
      this.allEmails.forEach(email => {
        if (this.newUser.email === email) {
          return true;
        }
      })
      return false;
    }

    else {
      return false;
    }
  }
}
