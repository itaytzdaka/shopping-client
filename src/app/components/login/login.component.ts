import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { MainService } from './../../services/main.service';
import { Component, OnInit} from '@angular/core';
import { UserModel } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
    //if user is logged in
    if(this.myUserService.isLoggedIn()){
      //if user is admin
      if(this.myUserService.isAdmin()){
        this.router.navigateByUrl("/admin");
      }
      //if regular user
      else{
        this.router.navigateByUrl("/home");
      }
    }
  }

  public async loginAsync() {
    try {
      this.myMainService.loginAndNavigateAsync(this.user);
    }
    catch (err) {
      alert(err.message)
    }
  }

}
