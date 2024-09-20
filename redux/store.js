// src/redux/store.js
import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './reducers/cartReducer';
import productReducer from './reducers/productReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  auth: authReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
