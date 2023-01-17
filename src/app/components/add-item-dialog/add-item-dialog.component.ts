import { getTestBed } from '@angular/core/testing';
import { StoreService } from './../../services/store.service';
import { CartItemService } from './../../services/cart-item.service';
import { store } from './../../redux/store';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/product.model';
import { CartItemModel } from 'src/app/models/cart-item.model';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {

  public selectedProduct: ProductModel;
  public cartItemToAdd: CartItemModel;
  public cartItems: CartItemModel[];

  constructor(
    private myCartItemService: CartItemService,
    private myStoreService: StoreService,
    public dialogRef: MatDialogRef<AddItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }



  ngOnInit(): void {
    
    if(!store.getState().isLoggedIn)
      return;

    this.cartItems = store.getState().cartItems;
    this.selectedProduct = store.getState().selectedProduct;
    this.cartItemToAdd = new CartItemModel();

    this.cartItemToAdd.productId = this.selectedProduct?._id;
    this.cartItemToAdd.cartId = this.myStoreService.getUserOpenCart()?._id;
    this.cartItemToAdd.product = this.selectedProduct;

  }

  public async addToCart(): Promise<void> {
    try {

      let existCartItem;

      //check if cart item is already exist.
      this.cartItems.forEach(c => {
        if (c.product._id === this.selectedProduct._id)
          existCartItem = c;
      })

      //if item is exist in the cart, update the item's amount in the DB
      if (existCartItem) {
        existCartItem.amount += this.cartItemToAdd.amount;
        existCartItem.totalPrice += this.cartItemToAdd.product.price * this.cartItemToAdd.amount;
        await this.myCartItemService.updateCartItemAsync(existCartItem);
      }

      //if not exist, add to DB
      else {
        const addedCartItem = await this.myCartItemService.addCartItemAsync(this.cartItemToAdd);
        addedCartItem.totalPrice = this.selectedProduct.price * addedCartItem.amount;
        this.cartItems.push(addedCartItem);
        this.myStoreService.saveUserOpenCartItems(this.cartItems);

      }
      this.dialogRef.close();

    }

    catch (err) {
      console.log(err);
    }

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
