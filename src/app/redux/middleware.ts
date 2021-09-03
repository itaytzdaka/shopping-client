import { Store } from "redux";
import { AppState } from "./app-state";
import { Action } from "./action";

// תחביר מקוצר לפונקציה הנ"ל
export const saveToSessionStorage = store => next => action => {
    // Here we are before the reducer
    next(action);
    // Here we are after the reducer
};
