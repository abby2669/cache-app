import { createStore, combineReducers } from 'redux';
import appReducer from '../reducer/appReducer';
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    reducer: appReducer
})

const store = configureStore({ reducer: rootReducer, middleware: [thunk] })

export default store;