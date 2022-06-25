import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import CurrencyReducer from "./reducers/CurrencyReducer";

let reducers = combineReducers({
    CurrencyReducer: CurrencyReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;