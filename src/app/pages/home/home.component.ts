import { store } from 'src/app/redux/store';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // events: string[] = [];
  public menuOpen: boolean;

  constructor(
    private myUserService: UserService,
  ) { }

  ngOnInit(): void {
    console.log("ngOnInit home");

    //get the menu status
    this.menuOpen = store.getState().MenuOpen;

    //redirect user
    this.myUserService.redirectUser("/home","/admin");

  }

  public changeMenuStatus(): boolean {
    this.menuOpen = !this.menuOpen;
    return this.menuOpen;
  }
}
