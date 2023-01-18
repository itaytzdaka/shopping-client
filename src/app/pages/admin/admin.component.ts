import { MainService } from './../../services/main.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public menuOpen: boolean = true;

  constructor(
    private myMainService: MainService
  ) { }

  ngOnInit(): void {
    this.myMainService.redirectUser("/home","/admin/edit/chooseProduct");
  }


  public changeMenuStatus(): boolean {
    this.menuOpen = !this.menuOpen;
    return this.menuOpen;
  }

}
