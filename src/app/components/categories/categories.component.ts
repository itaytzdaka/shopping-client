import { store } from './../../redux/store';
import { StoreService } from './../../services/store.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { Unsubscribe } from 'redux';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  public unsubscribe: Unsubscribe;
  public categories: CategoryModel[];


  constructor(
    private myCategoryService: CategoryService,
    private myStoreService: StoreService
  ) { }

  ngOnInit(): void {

    if(!store.getState().isLoggedIn)
      return;

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.getDataFromTheStore();
    });

    this.getDataFromTheStore();
    this.getDataFromTheServer();

  }


  public getDataFromTheStore(): void {
    this.categories = store.getState().categories;
  }

  public getDataFromTheServer(): void {
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

  ngOnDestroy(): void {
    if(this.unsubscribe)
      this.unsubscribe(); //stop listening to the store
  }

}
