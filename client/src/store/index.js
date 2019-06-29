import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// import rootReducer from "reducers";
import basketReducer from 'reducers/basketReducer';
import productsReducer from 'reducers/productsReducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  basket: basketReducer,
  products: productsReducer
})

const middlewares = [thunk];


/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  compose(applyMiddleware(...middlewares), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
);


/* eslint-enable */

export default store;


window.s = store.getState().products.items;