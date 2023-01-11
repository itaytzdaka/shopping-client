import { CategoryService } from '../../services/category.service';
import { store } from '../../redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { ProductService } from '../../services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public menuOpen: boolean = true;


  constructor(
    private myUserService: UserService,
    private myProductsService: ProductService,
    private myCategoryService: CategoryService
  ) { }

  ngOnInit(): void {

    this.myUserService.redirectUser("/home","/admin/edit/chooseProduct");
  }



  public async saveProductsInTheStoreAsync() {
    try {
      const products = await this.myProductsService.getAllProductsAsync();
      store.dispatch({ type: ActionType.saveProducts, payload: products });
    }
    catch (err) {
      console.log(err.message);
    }
  }

  public async saveCategoriesInTheStoreAsync() {
    try {
      const categories = await this.myCategoryService.getAllCategoriesAsync();
      store.dispatch({ type: ActionType.saveCategories, payload: categories });
    }

    catch (err) {
      console.log(err);
    }
  }

  public changeMenuStatus(): boolean {
    this.menuOpen = !this.menuOpen;
    return this.menuOpen;
  }

}
