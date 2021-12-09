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

const getBathUser = (days: number, name: string): string => {
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

const initialBathUserState: BathUser = {
  name: "henry",
  dayPassed: 0
}

const bathUserReducer = (state: BathUser = initialBathUserState, action: BathUserActionType) : BathUser => {
  if (action.type === "request/whois") {
    const dayPassed = countingDays(
      new Date(action.date),
      new Date(action.eventUser.date)
    );

    const userName = getBathUser(dayPassed, action.eventUser.name);

    //console.log(dayPassed, userName);

    return {
      name: userName,
      dayPassed
    };
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
      const newState = bathUserReducer(state, action.payload);

      // 오브젝트 복사 부분이 문제가 되는 것 같다.
      state.name = newState.name;
      state.dayPassed = newState.dayPassed;
    },
  },
  extraReducers: {},
});

export const { getTodayBathUser } = bathUserSlice.actions;

export default bathUserSlice.reducer;
