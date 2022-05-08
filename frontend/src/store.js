import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import { productReducer,  productDetailsReducer } from './reducers/productReducer';

const reducer = combineReducers({
    product: productReducer,
    productDetails: productDetailsReducer
});

let initialState = {}

const middleware = [thunk];

const store = configureStore({
    reducer,
    initialState, 
    middleware,
    devTools: true
});

export default store;