import { AppState } from "./app-state";
import { Action } from "./action";
import { ActionType } from "./action-type";


export function reducer(currentState: AppState, action: Action): AppState {

    const newState = { ...currentState }; // Spread Operator.

    switch (action.type) {

        case ActionType.saveUser:
            newState.user = action.payload;
            break;

        case ActionType.setLoggedInStatus:
            newState.isLoggedIn = action.payload;
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

        case ActionType.saveCartsOfUser:
            newState.cartsOfUser = action.payload;
            break;

        case ActionType.saveInvitesOfUser:
            newState.invitesOfUser = action.payload;
            break;

        case ActionType.saveCategories:
            newState.categories = action.payload;
            break;

        case ActionType.saveCities:
            newState.cities = action.payload;
            break;

        case ActionType.saveOpenCartItems:
            newState.cartItems = action.payload;
            break;

        case ActionType.setOrderCompleteStatus:
            newState.orderCompleted = action.payload;
            break;

        case ActionType.saveNewUser:
            newState.newUser = action.payload;
            break;

        case ActionType.saveSelectedProduct:
            newState.selectedProduct = action.payload;
            break;
    }


    return newState;
}