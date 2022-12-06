import { store } from 'src/app/redux/store';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  public menuOpen: boolean;

  constructor(
    private myUserService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {

    //get menu status
    this.menuOpen = store.getState().MenuOpen;


    // this.navigate();
    this.myUserService.redirectUser("/shopping/all","/admin");
  }


  //change menu status
  public changeMenuStatus() {
    this.menuOpen = !this.menuOpen;
    return this.menuOpen;
  }

}
