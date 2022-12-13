import { ProductModel } from 'src/app/models/product.model';
import { AddItemDialogComponent } from '../../../components/add-item-dialog/add-item-dialog.component';
import { UserService } from '../../../services/user.service';
import { CategoryService } from '../../../services/category.service';
import { CategoryModel } from '../../../models/category.model';
import { ActivatedRoute } from '@angular/router';
import { ActionType } from 'src/app/redux/action-type';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { store } from 'src/app/redux/store';
import { Unsubscribe } from 'redux';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  private unsubscribe: Unsubscribe;


  public products: ProductModel[];
  public productsByCategory: ProductModel[];
  public categories: CategoryModel[];
  public search: string;

  constructor(
    private myProductsService: ProductService,
    private myActivatedRoute: ActivatedRoute,
    private myCategoryService: CategoryService,
    private myUserService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {

    const isAdmin = store.getState().isAdmin;

    //if user is logged in and regular user
    if (!isAdmin) {
      console.log("products check");
      this.products = store.getState().products;
      this.categories = store.getState().categories;

      // Listen to changes: 
      this.unsubscribe = store.subscribe(() => {
        this.products = store.getState().products;
        this.categories = store.getState().categories;
      });


      if (!this.categories) {
        this.getCategoriesAsync();
      }

      if (!this.products) {
        this.getProductsAsync();
      }

      else {
        this.filterProductsByCategory(this.products);
      }
    }

  }



  //get products from DB
  public async getProductsAsync() {
    try {
      const products = await this.myProductsService.getAllProductsAsync();
      store.dispatch({ type: ActionType.saveProducts, payload: products });
      this.filterProductsByCategory(products);
    }
    catch (err) {
      console.log(err.message);
    }
  }

  //filter products array by category
  public filterProductsByCategory(products) {
    this.myActivatedRoute.params.subscribe(routeParams => {
      if (routeParams._id === "all") {
        this.productsByCategory = products;
      }
      else if (routeParams._id === "search") {
        this.productsByCategory = store.getState().products.filter(p => p.name.includes(this.search));
      }
      else {
        this.productsByCategory = store.getState().products.filter(p => p.category._id === routeParams._id);
      }
    });
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

  //when user clicked on a product
  public productOnClick(selectedProduct): void {
    store.dispatch({ type: ActionType.saveSelectedProduct, payload: selectedProduct });
    this.openDialog();
  }

  //open dialog: AddItemDialogComponent
  public openDialog(): void {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      width: '400px',
    });
  }

}
