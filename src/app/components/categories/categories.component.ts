import { store } from './../../redux/store';
import { StoreService } from './../../services/store.service';
import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public unsubscribe: Unsubscribe;
  public categories: CategoryModel[];


  constructor(
    private myCategoryService: CategoryService,
    private myStoreService: StoreService
  ) { }

  ngOnInit(): void {

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.getFromTheStore();
    });

    this.getFromTheStore();
    this.getDataFromServer();

  }


  public getFromTheStore() {
    this.categories = store.getState().categories;
  }

  public getDataFromServer() {
    this.getCategories();
  }


  //get categories from DB
  public async getCategories(): Promise<void> {
    try {
      if (!this.categories) {
        const categories = await this.myCategoryService.getAllCategoriesAsync();
        this.myStoreService.saveCategories(categories);
      }
    } catch (error) {
      console.log(error);
    }
  }

}
