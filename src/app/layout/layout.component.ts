import { ProductModel } from 'src/app/models/product.model';
import { Component, OnInit } from '@angular/core';
import { store } from 'src/app/redux/store';
import { ProductService } from 'src/app/services/product.service';
import { ActionType } from 'src/app/redux/action-type';
import { CategoryModel } from '../models/category.model';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public products: ProductModel[];
  public categories: CategoryModel[];


  constructor(
    private myProductsService: ProductService,
    private myCategoryService: CategoryService,
  ) { }

  ngOnInit(): void {
    this.getProductsAsync();
    this.getCategoriesAsync();
  }

  //get products from DB
  public async getProductsAsync() {
    try {
      const products = await this.myProductsService.getAllProductsAsync();
      store.dispatch({ type: ActionType.saveProducts, payload: products });
    }
    catch (err) {
      console.log(err.message);
    }
  }

  //get categories from DB
  public async getCategoriesAsync() {
    try {
      this.categories = await this.myCategoryService.getAllCategoriesAsync();
      store.dispatch({ type: ActionType.saveCategories, payload: this.categories });
    }
    catch (err) {
      console.log(err);
    }
  }

}
