import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  public categories: CategoryModel[];

}
