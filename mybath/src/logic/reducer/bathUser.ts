import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BathUser, DateString, EventUser } from "logic/type";

// 막상 BathUserActionType 타입으로 분기하지는 않는다.
// 리듀서를 모두 방문하기 때문에 결국 type 키값으로 판단하게 된다.
export interface BathUserActionType {
  type: "request/whois";
  date: DateString;
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

const getBathUser = (days: number, name: BathUser): BathUser => {
  if (days % 2 === 0) {
    if (name === "james") {
      return "james";
    } else {
      return "henry";
    }
  } else {
    if (name === "james") {
      return "henry";
    } else {
      return "james";
    }
  }
};

const bathUserReducer = (state: BathUser, action: BathUserActionType) => {
  if (action.type === "request/whois") {
    const dayPassed = countingDays(
      new Date(action.date),
      new Date(action.eventUser.date)
    );

    const userName = getBathUser(dayPassed, action.eventUser.name);
    return userName;
  } else {
    return state;
  }
};

const getDefaultValue = (): BathUser => "henry";
const initialBathUserState: BathUser = getDefaultValue();

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
