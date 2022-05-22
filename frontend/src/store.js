import {combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import { productReducer,  productDetailsReducer } from './reducers/productReducer';
import { authReducer, forgotPasswordReducer, userReducer } from './reducers/userReducer';

const reducer = combineReducers({
    product: productReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer
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