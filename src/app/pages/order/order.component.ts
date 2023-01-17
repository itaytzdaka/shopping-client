import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public menuOpen: boolean = true;
  public search: string;

  constructor(
    private myUserService: UserService
  ) { }

  ngOnInit(): void {

    //redirect user
    this.myUserService.redirectUser("/order", "/admin");

  }

  public userSearch(search: string): void {
    this.search = search;
  }


  //change the menu status
  public changeMenuStatus(): boolean {
    this.menuOpen = !this.menuOpen;
    return this.menuOpen;
  }

}
