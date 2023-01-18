import { MainService } from './../../services/main.service';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public menuOpen: boolean = true;

  constructor(
    private myMainService: MainService,
  ) { }

  ngOnInit(): void {
    
    //redirect user
    this.myMainService.redirectUser("/home","/admin");

  }


  public changeMenuStatus(): boolean {
    this.menuOpen = !this.menuOpen;
    return this.menuOpen;
  }
}
