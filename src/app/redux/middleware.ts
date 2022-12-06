import { Store } from "redux";
import { AppState } from "./app-state";
import { Action } from "./action";


// export function saveToSessionStorage(store: Store<AppState, Action>) {
//     return function (next) {
//         return function (action: Action) {
//             // Here we are before the reducer
//             next(action);
//             // Here we are after the reducer
//             sessionStorage.setItem("AppState", JSON.stringify(store.getState()));
//         }
//     }
// }

// תחביר מקוצר לפונקציה הנ"ל
export const saveToSessionStorage = store => next => action => {
    // Here we are before the reducer
    next(action);
    // Here we are after the reducer
};
