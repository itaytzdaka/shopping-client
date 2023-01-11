import { ActionType } from 'src/app/redux/action-type';
import { ProductService } from '../../../services/product.service';
import { Unsubscribe } from 'redux';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { store } from 'src/app/redux/store';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminProductsComponent implements OnInit {

  public products: ProductModel[];
  // public categories: CategoryModel[];
  private unsubscribe: Unsubscribe;
  public search: string;

  constructor(private myProductsService: ProductService) { }

  ngOnInit(): void {

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.getDataFromStore();
    });

    this.getDataFromStore();
  }

  //get data from the store
  public getDataFromStore(): void {
    this.products = store.getState().products;
  }

  ngOnDestroy(): void {
    this.unsubscribe(); //stop listening to the store
  }

}
