import { ActionType } from 'src/app/redux/action-type';
import { CartItemService } from '../../services/cart-item.service';
import { store } from '../../redux/store';
import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductModel } from 'src/app/models/product.model';
import { CartItemModel } from 'src/app/models/cart-item.model';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-preview-item',
  templateUrl: './preview-item.component.html',
  styleUrls: ['./preview-item.component.scss']
})
export class PreviewItemComponent implements OnInit {

  public selectedProduct: ProductModel;
  public cartItemToAdd: CartItemModel;
  public cartItems: CartItemModel[];
  
  constructor(
    private myCartItemService: CartItemService,
    public dialogRef: MatDialogRef<PreviewItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.cartItems=store.getState().cartItems;
    this.selectedProduct=store.getState().selectedProduct;
    this.cartItemToAdd=new CartItemModel();

    this.cartItemToAdd.productId=this.selectedProduct._id;
    this.cartItemToAdd.cartId=store.getState().openCart._id;
    this.cartItemToAdd.product=this.selectedProduct;

  }

  public async addToCart(){
    try{

      let existCartItem;
      //check if cart item is already exist.
      this.cartItems.forEach(c=>{
        if(c.product._id===this.selectedProduct._id)
          existCartItem=c;
      })

      //if item is exist in the cart, update the item in the DB
      if(existCartItem){
        existCartItem.amount+=this.cartItemToAdd.amount;
        existCartItem.totalPrice+=this.cartItemToAdd.product.price*this.cartItemToAdd.amount;
        await this.myCartItemService.updateCartItemAsync(existCartItem);
      }

      //if not exist, add to DB
      else{
        const addedCartItem=await this.myCartItemService.addCartItemAsync(this.cartItemToAdd);
        addedCartItem.totalPrice=this.selectedProduct.price*addedCartItem.amount;
        store.dispatch({ type: ActionType.addNewCartItem, payload: addedCartItem });

      }
      this.dialogRef.close();

    }

    catch(err){
      console.log(err);
    }

  }

}
