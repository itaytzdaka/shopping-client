import { StoreService } from './../../services/store.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { ProductModel } from 'src/app/models/product.model';
import { AddItemDialogComponent } from '../../components/add-item-dialog/add-item-dialog.component';
import { PreviewItemComponent } from '../preview-item/preview-item.component';

import { ProductService } from '../../services/product.service';
import { store } from 'src/app/redux/store';
import { Unsubscribe } from 'redux';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private unsubscribe: Unsubscribe;

  public products: ProductModel[];
  public productsByCategory: ProductModel[];
  public isLoggedIn: boolean;

  //inputs
  @Input()
  public addProducts: boolean;
  @Input()
  public editProducts: boolean;
  @Input()
  public clickable: boolean;
  @Input()
  public search: string;

  constructor(
    private myProductsService: ProductService,
    private myActivatedRoute: ActivatedRoute,
    private myStoreService: StoreService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log("ngOnInit products");
    
    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.getDataFromStore();
    });

    this.getDataFromStore();
    this.getDataFromServer();
  }


  public getDataFromStore() {
    this.isLoggedIn = store.getState().isLoggedIn;
    this.products = store.getState().products;
    this.productsByCategory = store.getState().products;
  }

  public async getDataFromServer() {
    await this.getProducts()
    this.filterProductsByCategory();
  }


  //get products from DB
  public async getProducts(): Promise<void> {
    try {
      if (!this.products) {
        const products = await this.myProductsService.getAllProductsAsync();
        this.myStoreService.saveProducts(products);
      }
    } catch (error) {
      console.log(error);
    }
  }


  //filter products
  public filterProductsByCategory() : void{

    this.myActivatedRoute.params.subscribe(routeParams => {

      //no filter
      if (!routeParams._id || routeParams._id === "all") {
        this.productsByCategory = store.getState().products;
      }

      //filter by category_id
      else {
        this.productsByCategory = store.getState().products.filter(p => p.category._id === routeParams._id);
      }
    });
  }

  //when user clicked on a product
  public productOnClick(selectedProduct: ProductModel): void {
    this.myStoreService.saveSelectedProduct(selectedProduct);

    if (this.addProducts)
      this.openDialog();
    else {
      this.openPreview();
    }
  }

  //open dialog: AddItemDialogComponent
  public openDialog(): void {
    this.dialog.open(AddItemDialogComponent, {
      width: '400px',
    });
  }

  //open preview: PreviewItemComponent
  public openPreview(): void {
    this.dialog.open(PreviewItemComponent, {
      width: '400px',
    });
  }

}
