import { createStore, applyMiddleware } from "redux";
import { reducer } from "./reducer";
import { AppState } from "./app-state";


export const store = createStore(reducer, new AppState());
