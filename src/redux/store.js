// redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import mechanicReducer from './reducers/mechanicReducer';

import driverReducer from './reducers/driverReducer';
import itemReducer from './reducers/itemReducer';
import orderReducer from './reducers/orderReducer';
import adminReducer from './reducers/adminReducer';

import storeReducer from './reducers/storeReducer';
import uploadReducer from './reducers/uploadReducer';
import invoiceReducer from './reducers/invoiceReducer';
import contactReducer from './reducers/contactReducer';

const rootReducer = combineReducers({
  mechanic: mechanicReducer,
  driver: driverReducer, 
  item: itemReducer, 
  order: orderReducer,
  admin: adminReducer,

  store: storeReducer,
  upload: uploadReducer,
  invoice : invoiceReducer,
  contact:contactReducer
  // Add other reducers as needed
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
