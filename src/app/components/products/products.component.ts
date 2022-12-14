import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit , Input} from '@angular/core';

import { ProductModel } from 'src/app/models/product.model';
import { AddItemDialogComponent } from '../../components/add-item-dialog/add-item-dialog.component';
import { PreviewItemComponent } from '../preview-item/preview-item.component';

import { ActionType } from 'src/app/redux/action-type';
import { ProductService } from '../../services/product.service';
import { store } from 'src/app/redux/store';
import { Unsubscribe } from 'redux';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';


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
  public shoppingRoute: boolean = false;
  public adminRoute: boolean = false;
  public guestRoute: boolean = false;

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
    private myCategoryService: CategoryService,
    private myUserService: UserService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log("ngOnInit products");

    this.updateRoutesProperties();

    // Listen to changes: 
    this.unsubscribe = store.subscribe(() => {
      this.products = store.getState().products;
      this.isLoggedIn = store.getState().isLoggedIn;

      if(this.products && !this.productsByCategory)
        this.filterProductsByCategory(this.products);
    });

    this.isLoggedIn = store.getState().isLoggedIn;
    this.products = store.getState().products;

    if(this.products)
      this.filterProductsByCategory(this.products);

  }



  //filter products array by category
  public filterProductsByCategory(products) {
    console.log("filterProductsByCategory");
    console.log(this.router.url)

    this.myActivatedRoute.params.subscribe(routeParams => {
      console.log("routeParams");
      console.log(routeParams);
      if (!routeParams._id || routeParams._id === "all") {
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

    //when user clicked on a product
    public productOnClick(selectedProduct): void {
      store.dispatch({ type: ActionType.saveSelectedProduct, payload: selectedProduct });

      if(this.addProducts)
        this.openDialog();
      else{
        this.openPreview();
      }
    }
  
    //open dialog: AddItemDialogComponent
    public openDialog(): void {
      const dialogRef = this.dialog.open(AddItemDialogComponent, {
        width: '400px',
      });
    }

    //open preview: PreviewItemComponent
    public openPreview(): void {
      const dialogRef = this.dialog.open(PreviewItemComponent, {
        width: '400px',
      });
    }

    public updateRoutesProperties(){
      this.adminRoute=this.router.url.includes("admin");
      this.shoppingRoute=this.router.url.includes("shopping");
      this.guestRoute=this.router.url.includes("home");
    }
}
