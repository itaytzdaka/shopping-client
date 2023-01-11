import { CartItemModel } from './../models/cart-item.model';
import { CityModel } from './../models/city.model';
import { Injectable } from '@angular/core';
import { ActionType } from '../redux/action-type';
import { store } from '../redux/store';

//models
import { InviteModel } from './../models/invite.model';
import { CartModel } from '../models/cart.model';
import { UserModel } from '../models/user.model';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor() { }

  //save data functions:

  public loginUser(user: UserModel): void {
    store.dispatch({ type: ActionType.saveUser, payload: user });
    store.dispatch({ type: ActionType.setLoggedInStatus, payload: true });
  }

  public saveProducts(products: ProductModel[]): void {
    store.dispatch({ type: ActionType.saveProducts, payload: products });
  }

  public saveNumOfInvites(numOfInvites: number): void {
    store.dispatch({ type: ActionType.saveNumOfInvites, payload: numOfInvites });
  }

  public saveNumOfProducts(numOfProducts: number): void {
    store.dispatch({ type: ActionType.saveNumOfProducts, payload: numOfProducts });
  }

  public saveCartsOfUser(cartsOfUser: CartModel[]): void {
    store.dispatch({ type: ActionType.saveCartsOfUser, payload: cartsOfUser });
  }

  public addNewCartForUser(cartToAdd: CartModel): void {
    const allCartsOfUser = store.getState().cartsOfUser;
    allCartsOfUser.push(cartToAdd);
    store.dispatch({ type: ActionType.saveCartsOfUser, payload: allCartsOfUser });
    store.dispatch({ type: ActionType.saveOpenCartItems, payload: [] });
  }

  public saveInvitesOfUser(invitesOfUser: InviteModel[]): void {
    store.dispatch({ type: ActionType.saveInvitesOfUser, payload: invitesOfUser });
  }

  public saveCategories(categories: CategoryModel[]): void {
    store.dispatch({ type: ActionType.saveCategories, payload: categories });
  }

  public saveCities(cities: CityModel[]): void {
    store.dispatch({ type: ActionType.saveCities, payload: cities });
  }

  public saveUserOpenCartItems(openCartItemsOfUser: CartItemModel[]): void {
    store.dispatch({ type: ActionType.saveOpenCartItems, payload: openCartItemsOfUser });
  }

  public addNewProduct(productToAdd: ProductModel): void {
    const allProducts = store.getState().products;
    allProducts.push(productToAdd);
    store.dispatch({ type: ActionType.saveProducts, payload: allProducts });
  }

  public addNewInvite(newInvite: InviteModel): void {
    const allInvitesOfUser = store.getState().invitesOfUser;
    allInvitesOfUser.push(newInvite);
    store.dispatch({ type: ActionType.saveInvitesOfUser, payload: allInvitesOfUser });
    store.dispatch({ type: ActionType.saveNumOfInvites, payload: store.getState().numOfInvites + 1 });
    // store.dispatch({ type: ActionType.setOpenCart, payload: null });
    store.dispatch({ type: ActionType.setOrderCompleteStatus, payload: true });
  }

  public saveNewUser(newUser: UserModel): void {
    store.dispatch({ type: ActionType.saveNewUser, payload: newUser });
  }

  public saveSelectedProduct(selectedProduct: ProductModel): void {
    store.dispatch({ type: ActionType.saveSelectedProduct, payload: selectedProduct });
  }

  public addNewCartItemForUser(newCartItemToAdd: CartItemModel) {
    const openCartItemsOfUser = store.getState().cartItems;
    openCartItemsOfUser.push(newCartItemToAdd);
    store.dispatch({ type: ActionType.saveOpenCartItems, payload: openCartItemsOfUser });

  }

  public disconnectUser(): void {
    store.dispatch({ type: ActionType.saveUser, payload: null });
    store.dispatch({ type: ActionType.saveCartsOfUser, payload: null });
    store.dispatch({ type: ActionType.saveInvitesOfUser, payload: null });
    store.dispatch({ type: ActionType.setLoggedInStatus, payload: false });
  }


  //get data functions:

  public getLastInvite(): InviteModel {
    return store.getState().invitesOfUser ?
      store.getState().invitesOfUser[store.getState().invitesOfUser.length - 1] : null;
  }

  public isAdmin(): boolean {
    return store.getState().isAdmin === 1 ? true : false;
  }

  public isCartsArrayOfUserEmpty(): boolean {
    return store.getState().cartsOfUser?.length === 0 ? true : false;
  }

  public getNumOfProductsFromUserOpenCartItems(): number {
    return store.getState().cartItems?.length;
  }

  public getNumOfProducts(): number {
    return store.getState().products?.length;
  }

  public getUserOpenCartTotalPrice(): number {
    const cartItems = store.getState().cartItems;
    let openCartTotalPrice: number = 0;

    for (let i = 0; i < cartItems?.length; i++) {
      let totalProductPrice = cartItems[i].product.price * cartItems[i].amount;
      cartItems[i].totalPrice = totalProductPrice;
      openCartTotalPrice = openCartTotalPrice + totalProductPrice;
    }
    return openCartTotalPrice;
  }

  public getUserLastInvite(): InviteModel {
    return store.getState().invitesOfUser ?
      store.getState().invitesOfUser[store.getState().invitesOfUser.length - 1] : null;
  }

  public getUserOpenCart(): CartModel {
    return store.getState().cartsOfUser?.length > store.getState().invitesOfUser?.length ?
      store.getState().cartsOfUser[store.getState().cartsOfUser.length - 1] : null;
  }

  // delete data functions

  public deleteCartItemFromUserOpenCart(cartItem_id: string): void {

    //create new array, without the item that the user deleted.
    const openCartItemsOfUser = store.getState().cartItems.filter(cartItem => cartItem._id != cartItem_id);

    store.dispatch({ type: ActionType.saveOpenCartItems, payload: openCartItemsOfUser });
  }

  public deleteAllCartItemsFromUserOpenCart(): void {
    const cartItems = [];
    this.saveUserOpenCartItems(cartItems);
  }
}
