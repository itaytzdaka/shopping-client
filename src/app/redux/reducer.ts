import { AppState } from "./app-state";
import { Action } from "./action";
import { ActionType } from "./action-type";
import { UserService } from '../services/user.service';
import { CartModel } from '../models/cart.model';

export function reducer(currentState: AppState, action: Action): AppState {

    const newState = { ...currentState }; // Spread Operator.
    let cartTotalPrice;

    switch (action.type) {
        case ActionType.login:
            newState.user = action.payload;
            newState.isLoggedIn = true;
            break;

        case ActionType.saveProducts:
            newState.products = action.payload;
            break;

        case ActionType.saveNumOfInvites:
            newState.numOfInvites = action.payload;
            break;

        case ActionType.saveNumOfProducts:
            newState.numOfProducts = action.payload;
            break;

        case ActionType.saveCarts:
            newState.carts = action.payload;
            break;

        case ActionType.saveInvites:
            newState.invites = action.payload;
            break;

        case ActionType.saveCategories:
            newState.categories = action.payload;
            break;

        case ActionType.saveCities:
            newState.cities = action.payload;
            break;

        case ActionType.saveCartItems:
            //save the cart items in the store
            newState.cartItems = action.payload;

            //save the number of the cart items in the store
            newState.cartNumberOfItems = newState.cartItems.length;

            //check if cart is empty
            if (newState.cartItems.length === 0) {
                newState.IsCartEmpty = true;
            }

            //Calculate the price of each item in relation to the amount
            cartTotalPrice = 0;
            for (let i = 0; i < newState.cartItems.length; i++) {
                let totalProductPrice = newState.cartItems[i].product.price * newState.cartItems[i].amount;
                newState.cartItems[i].totalPrice = totalProductPrice;
                cartTotalPrice = cartTotalPrice + totalProductPrice;
            }
            //save the total price of the cart in the store
            newState.cartTotalPrice = cartTotalPrice;
            break;

        case ActionType.loadUserCart:

            //check if new user
            if (newState.carts.length === 0) {
                newState.isNewUser = true;
                break;
            }

            //check if is there invite for all carts
            if (newState.carts.length === newState.invites.length) {
                newState.lastInvite = newState.invites[newState.invites.length - 1];
            }

            //check if is there any open cart
            else {
                newState.openCart = newState.carts[newState.carts.length - 1];
            }
            break;

        case ActionType.addNewCart:
            newState.lastInvite = undefined;
            newState.openCart = {};
            newState.openCart.date = (new Date()).toJSON();
            newState.openCart.userId = newState.user._id;
            newState.cartItems = [];
            newState.IsCartEmpty = true;
            break;

        case ActionType.addNewProduct:
            newState.products.push(action.payload);

            break;

        case ActionType.addNewInvite:
            newState.invites.push(action.payload);
            newState.openCart = undefined;
            break;

        case ActionType.saveNewUser:
            newState.newUser = action.payload;
            break;

        case ActionType.deleteCartItem:
            newState.cartItems = newState.cartItems.filter(cartItem => cartItem._id != action.payload);
            cartTotalPrice = 0;
            for (let i = 0; i < newState.cartItems.length; i++) {
                cartTotalPrice = cartTotalPrice + newState.cartItems[i].totalPrice;
            }
            newState.cartTotalPrice = cartTotalPrice;

            if (newState.cartItems.length === 0) {
                newState.IsCartEmpty = true;
            }
            break;


        case ActionType.deleteAllCartItems:
            newState.cartItems = [];
            cartTotalPrice = 0;
            newState.IsCartEmpty = true;
            break;

        case ActionType.changeMenuStatus:
            newState.MenuOpen = action.payload;
            break;

        case ActionType.saveSelectedProduct:
            newState.selectedProduct = action.payload;
            break;

        case ActionType.addNewCartItem:
            newState.IsCartEmpty = false;
            newState.cartItems.push(action.payload);
            cartTotalPrice = 0;
            for (let i = 0; i < newState.cartItems.length; i++) {
                cartTotalPrice = cartTotalPrice + newState.cartItems[i].totalPrice;
            }
            newState.cartTotalPrice = cartTotalPrice;
            break;

        case ActionType.disconnect:
            newState.isLoggedIn = false;
            // newState.openCart=undefined;
            // newState.IsCartEmpty=undefined;
            // newState.
            break;
    }


    return newState;
}