import { ActionType } from 'src/app/redux/action-type';
import { ProductService } from '../../../services/product.service';
import { Unsubscribe } from 'redux';
import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/models/product.model';
import { store } from 'src/app/redux/store';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  public products: ProductModel[];
  // public categories: CategoryModel[];
  private unsubscribe: Unsubscribe;
  public search: string;

  constructor(private myProductsService: ProductService) { }

  ngOnInit(): void {

    this.getFromStore();

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.getFromStore();
    });

  }

  //get data from the store
  public getFromStore(): void{
    this.products = store.getState().products;
  }

  ngOnDestroy(): void {
    this.unsubscribe(); //stop listening to the store
  }

}
