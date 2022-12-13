import { ProductModel } from 'src/app/models/product.model';
import { Component, OnInit } from '@angular/core';
import { store } from 'src/app/redux/store';
import { ProductService } from 'src/app/services/product.service';
import { ActionType } from 'src/app/redux/action-type';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public products: ProductModel[];


  constructor(
    private myProductsService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getProductsAsync();
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

}
