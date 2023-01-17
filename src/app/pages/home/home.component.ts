import { Component, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public menuOpen: boolean = true;

  constructor(
    private myUserService: UserService,
  ) { }

  ngOnInit(): void {
    
    //redirect user
    this.myUserService.redirectUser("/home","/admin");

  }


  public changeMenuStatus(): boolean {
    this.menuOpen = !this.menuOpen;
    return this.menuOpen;
  }
}
