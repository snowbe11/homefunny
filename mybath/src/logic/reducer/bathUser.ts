import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BathUser, EventUser } from "logic/type";

// 막상 BathUserActionType 타입으로 분기하지는 않는다.
// 리듀서를 모두 방문하기 때문에 결국 type 키값으로 판단하게 된다.
export interface BathUserActionType {
  type: "request/whois";
  date: number;
  eventUser: EventUser;
}

const countingDays = (date: Date, from: Date) => {
  const fromDay = new Date(from.toLocaleDateString());
  const currentDay = new Date(date.toLocaleDateString());
  const one_day = 1000 * 60 * 60 * 24;
  const diff = (currentDay.getTime() - fromDay.getTime()) / one_day;
  const sign = Math.sign(diff);
  return Math.floor(Math.abs(diff)) * sign;
};

const getBathUser = (days: number, user: BathUser): BathUser => {
  if (days % 2 === 0) {
    if (user.name === "james") {
      return { name: "james" };
    } else {
      return { name: "henry" };
    }
  } else {
    if (user.name === "james") {
      return { name: "henry" };
    } else {
      return { name: "james" };
    }
  }
};

const initialBathUserState: BathUser = {
  name: "henry"
}

const bathUserReducer = (state: BathUser = initialBathUserState, action: BathUserActionType) => {
  if (action.type === "request/whois") {
    const dayPassed = countingDays(
      new Date(action.date),
      new Date(action.eventUser.date)
    );

    const userName = getBathUser(dayPassed, action.eventUser.user);
    return userName;
  } else {
    return state;
  }
};

const bathUserSlice = createSlice({
  name: "bathUser",
  initialState: initialBathUserState,
  reducers: {
    getTodayBathUser: (
      state: BathUser,
      action: PayloadAction<BathUserActionType>
    ) => {
      state = bathUserReducer(state, action.payload);
    },
  },
  extraReducers: {},
});

export const { getTodayBathUser } = bathUserSlice.actions;

export default bathUserSlice.reducer;
