import { EventUser, BathUser } from "./type";
import { eventUserReducer } from "./reducer/eventUser";
import { bathUserReducer } from "./reducer/bathUser";
//import { combineReducers } from "redux";
import {
  combineReducers,
  configureStore,
  createStore,
  Reducer,
} from "@reduxjs/toolkit";

export type RootState = {
  eventUser: EventUser;
  bathUser: BathUser;
};

const rootReducers: Reducer<RootState> = combineReducers({
  eventUser: eventUserReducer,
  bathUser: bathUserReducer,
});

// const store = configureStore({
//   reducer: rootReducers,
//   //devTools: true,
// });

const store = createStore(rootReducers);

export default store;
