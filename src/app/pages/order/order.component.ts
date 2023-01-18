import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public menuOpen: boolean = true;
  public search: string;

  constructor(
    private myMainService: MainService
  ) { }

  ngOnInit(): void {

    //redirect user
    this.myMainService.redirectUser("/order", "/admin");

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
