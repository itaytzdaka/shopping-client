import { MainService } from '../../../../services/main.service';
import { Component} from '@angular/core';
import { UserModel } from '../../../../models/user.model';

@Component({
  selector: 'home-menu-login',
  templateUrl: './home-menu-login.component.html',
  styleUrls: ['./home-menu-login.component.scss']
})
export class LoginComponent{

  public user = new UserModel();

  constructor(
    private myMainService: MainService
  ) { }

  public loginAsync(): void {
    this.myMainService.loginAndNavigateAsync(this.user);
  }

}
