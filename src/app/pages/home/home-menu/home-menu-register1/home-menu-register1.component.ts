import { MainService } from './../../../../services/main.service';
import { StoreService } from './../../../../services/store.service';
import { store } from '../../../../redux/store';
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

  public newUser: UserModel;
  public allEmails: string[];
  public passwordsMatch: boolean;
  public emailExist: boolean = false;
  public confirmPassword: string;

  constructor(
    private myUserService: UserService,
    private myStoreService: StoreService,
    private myMainService: MainService,
    private router: Router
  ) { }

  ngOnInit(): void {

    //needed if user return to step 1 from step 2
    this.newUser = store.getState().newUser;

    this.getAllEmailsAsync();
  }


  public navigateToStep2(): void {
    this.myStoreService.saveNewUser(this.newUser);
    this.router.navigateByUrl("/home/register/2");
  }

  public async getAllEmailsAsync(): Promise<void> {
    try {
      this.allEmails  = await this.myUserService.getAllEmailsAsync();
    }
    catch (error) {
      this.myMainService.errorHandling(error);
    }
  }

  public PasswordsDoNotMatch(): void {
    this.passwordsMatch = this.confirmPassword === this.newUser?.password? true : false;
  }

  public isEmailExist(): void{
    const index= this.allEmails?.findIndex((obj)=>obj["email"]==this.newUser.email);
    this.emailExist= index==-1? false : true;
  }
}
