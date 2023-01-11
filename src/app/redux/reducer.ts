import { AppState } from "./app-state";
import { Action } from "./action";
import { ActionType } from "./action-type";


export function reducer(currentState: AppState, action: Action): AppState {

    const newState = { ...currentState }; // Spread Operator.

    switch (action.type) {
        // case ActionType.login:
        //     console.log("ActionType.login");
        //     newState.user = action.payload;
        //     newState.isLoggedIn = true;
        //     newState.isAdmin = newState.user.isAdmin;
        //     break;

        case ActionType.saveUser:
            newState.user = action.payload;
            break;

        case ActionType.setLoggedInStatus:
            newState.isLoggedIn = action.payload;
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

        case ActionType.saveOpenCartItems:
            console.log("ActionType.saveCartItems");

            newState.cartItems = action.payload;
            break;

        // case ActionType.addNewProduct:
        //     console.log("ActionType.addNewProduct");

        //     newState.products.push(action.payload);
        //     break;


        case ActionType.setOrderCompleteStatus:
            newState.orderCompleted = action.payload;
            break;


        case ActionType.saveNewUser:
            console.log("ActionType.saveNewUser");

            newState.newUser = action.payload;
            break;


        case ActionType.saveSelectedProduct:
            console.log("ActionType.saveSelectedProduct");

            newState.selectedProduct = action.payload;
            break;


        // case ActionType.disconnect:
        //     console.log("ActionType.disconnect");

        //     newState.isLoggedIn = false;
        //     newState.user = null;

        //     break;
    }


    return newState;
}