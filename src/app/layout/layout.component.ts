import { InviteModel } from './../models/invite.model';
import { ProductModel } from 'src/app/models/product.model';
import { Component, OnInit } from '@angular/core';
import { store } from 'src/app/redux/store';
import { ProductService } from 'src/app/services/product.service';
import { ActionType } from 'src/app/redux/action-type';
import { CategoryModel } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { InviteService } from '../services/invite.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public products: ProductModel[];
  public categories: CategoryModel[];
  public numOfInvites: number;

  constructor(
    private myProductsService: ProductService,
    private myCategoryService: CategoryService,
    private myInviteService: InviteService
  ) { }

  ngOnInit(): void {
    this.getProductsAsync();
    this.getCategoriesAsync();
    this.getNumOfInvites();
  }

  //get products from DB
  public async getProductsAsync(): Promise<void> {
    try {
      const products = await this.myProductsService.getAllProductsAsync();
      store.dispatch({ type: ActionType.saveProducts, payload: products });
    }
    catch (error) {
      console.log(error.message);
    }
  }

  //get categories from DB
  public async getCategoriesAsync(): Promise<void> {
    try {
      this.categories = await this.myCategoryService.getAllCategoriesAsync();
      store.dispatch({ type: ActionType.saveCategories, payload: this.categories });
    }
    catch (error) {
      console.log(error);
    }
  }

  //get num of invites from DB
  public async getNumOfInvites(): Promise<void> {
    try {
      this.numOfInvites = await this.myInviteService.getNumOfInvites();
      store.dispatch({ type: ActionType.saveNumOfInvites, payload: this.numOfInvites });
    } catch (error) {
      console.log(error);
    }
  }
}
