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

  constructor(
    private myMainService: MainService
  ) { }

  ngOnInit(): void {
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
