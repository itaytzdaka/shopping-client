import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-main',
  templateUrl: './shopping-main.component.html',
  styleUrls: ['./shopping-main.component.scss']
})
export class ShoppingMainComponent implements OnInit {

  public search: string;

  constructor() { }

  ngOnInit(): void {

  }
}
