import { AppState } from "./app-state";
import { Action } from "./action";
import { ActionType } from "./action-type";


export function reducer(currentState: AppState, action: Action): AppState {

    const newState = { ...currentState }; // Spread Operator.
    let cartTotalPrice;

    switch (action.type) {
        case ActionType.login:
            console.log("ActionType.login");
            newState.user = action.payload;
            newState.isLoggedIn = true;
            newState.isAdmin = newState.user.isAdmin;
            break;

        case ActionType.saveProducts:
            console.log("ActionType.saveProducts");
            newState.products = action.payload;
            break;

        case ActionType.saveNumOfInvites:
            console.log("ActionType.saveNumOfInvites");
            newState.numOfInvites = action.payload;
            break;

        case ActionType.saveNumOfProducts:
            console.log("ActionType.saveNumOfProducts");
            newState.numOfProducts = action.payload;
            break;

        case ActionType.saveCartsOfUser:
            console.log("ActionType.saveCarts");
            newState.cartsOfUser = action.payload;
            break;

        case ActionType.saveInvitesOfUser:
            console.log("ActionType.saveInvites");
            newState.invitesOfUser = action.payload;
            break;

        case ActionType.saveCategories:
            console.log("ActionType.saveCategories");
            newState.categories = action.payload;
            break;

        case ActionType.saveCities:
            console.log("ActionType.saveCities");
            newState.cities = action.payload;
            break;

        case ActionType.saveCartItems:
            console.log("ActionType.saveCartItems");
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
            console.log("ActionType.loadUserCart");

            //check if new user
            if (newState.cartsOfUser.length === 0) {
                newState.noCarts = true;
                break;
            }

            //check if is there invite for all carts
            if (newState.cartsOfUser.length === newState.invitesOfUser.length) {
                newState.lastInvite = newState.invitesOfUser[newState.invitesOfUser.length - 1];
            }

            //check if is there any open cart
            else {
                newState.openCart = newState.cartsOfUser[newState.cartsOfUser.length - 1];
            }
            break;

        case ActionType.addNewCart:
            console.log("ActionType.addNewCart");

            newState.lastInvite = undefined;
            newState.openCart = {};
            newState.openCart.date = (new Date()).toJSON();
            newState.openCart.userId = newState.user._id;
            newState.cartItems = [];
            newState.IsCartEmpty = true;
            newState.noCarts = false;

            break;

        case ActionType.addNewProduct:
            console.log("ActionType.addNewProduct");

            newState.products.push(action.payload);

            break;

        case ActionType.addNewInvite:
            console.log("ActionType.addNewInvite");

            newState.invitesOfUser.push(action.payload);
            newState.openCart = undefined;
            break;

        case ActionType.saveNewUser:
            console.log("ActionType.saveNewUser");

            newState.newUser = action.payload;
            break;

        case ActionType.deleteCartItem:
            console.log("ActionType.deleteCartItem");

            //create new array, without the item that the user deleted.
            newState.cartItems = newState.cartItems.filter(cartItem => cartItem._id != action.payload);

            //save the number of the cart items in the store
            newState.cartNumberOfItems = newState.cartItems.length;

            //calculate the total price of the cart.
            cartTotalPrice = 0;
            for (let i = 0; i < newState.cartItems.length; i++) {
                cartTotalPrice = cartTotalPrice + newState.cartItems[i].totalPrice;
            }
            newState.cartTotalPrice = cartTotalPrice;

            //if cart is now empty.
            if (newState.cartItems.length === 0) {
                newState.IsCartEmpty = true;
            }
            break;


        case ActionType.deleteAllCartItems:
            console.log("ActionType.deleteAllCartItems");

            newState.cartItems = [];
            newState.cartTotalPrice = 0;
            newState.cartNumberOfItems = 0;
            newState.IsCartEmpty = true;
            break;

        case ActionType.changeMenuStatus:
            console.log("ActionType.changeMenuStatus");

            newState.MenuOpen = action.payload;
            break;

        case ActionType.saveSelectedProduct:
            console.log("ActionType.saveSelectedProduct");

            newState.selectedProduct = action.payload;
            break;

        case ActionType.addNewCartItem:
            console.log("ActionType.addNewCartItem");

            newState.IsCartEmpty = false;
            newState.cartItems.push(action.payload);
            newState.cartNumberOfItems++;
            cartTotalPrice = 0;
            for (let i = 0; i < newState.cartItems.length; i++) {
                cartTotalPrice = cartTotalPrice + newState.cartItems[i].totalPrice;
            }
            newState.cartTotalPrice = cartTotalPrice;
            break;

        case ActionType.disconnect:
            console.log("ActionType.disconnect");

            newState.isLoggedIn = false;
            newState.user = null;

            break;
    }


    return newState;
}