import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { MainService } from '../../../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../../models/user.model';

@Component({
  selector: 'home-menu-login',
  templateUrl: './home-menu-login.component.html',
  styleUrls: ['./home-menu-login.component.scss']
})
export class LoginComponent implements OnInit {

  public user = new UserModel();
  // public invites: InviteModel[];

  constructor(
    private myMainService: MainService,
    private myUserService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("ngOnInit login");
  }



  public async loginAsync() {
    try {
      this.myMainService.loginAndNavigateAsync(this.user);
    }
    catch (err) {
      console.log(err.message)
    }
  }

}
