import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  public menuOpen: boolean =true;

  constructor(
    private myUserService: UserService
  ) { }

  ngOnInit(): void {

    //redirect user to the right place
    this.myUserService.redirectUser("/shopping/all","/admin");
  }


  //change menu status
  public changeMenuStatus(): void {
    this.menuOpen = !this.menuOpen;
  }

}
