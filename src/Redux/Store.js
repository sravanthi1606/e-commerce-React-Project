import { legacy_createStore,applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducers from "../Redux/Reducer/StoreReducer";


const persistConfig = {
    key: 'root',
    storage,
  };

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = legacy_createStore(persistedReducer,applyMiddleware(thunk));
export default store;