import { EventUser, BathUser } from "./type";
import eventUserReducer from "./reducer/eventUser";
import bathUserReducer from "./reducer/bathUser";
import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";

export type RootState = {
  eventUser: EventUser;
  bathUser: BathUser;
};

// 런타임 오류는 섞어쓰는 것 때문인것 같다.

const rootReducers: Reducer<RootState> = combineReducers({
  eventUser: eventUserReducer,
  bathUser: bathUserReducer,
});

const store = configureStore({
  reducer: rootReducers,
  //devTools: true,
});

export default store;
