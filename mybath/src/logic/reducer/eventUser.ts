import { async } from "@firebase/util";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getEventState } from "logic/access";
import { EventUser } from "logic/type";

const initialEventUserState: EventUser = {
  date: new Date(),
  name: "james",
};

export interface EventUserAction {
  type: "request";
}

const fetchEventUser = async () => {
  const { eventDate, eventName } = await getEventState();
  return { date: eventDate, name: eventName };
};

// 이 코드는 일반 리듀서
export const eventUserReducer = (
  state = initialEventUserState,
  action: EventUserAction
) => {
  if (action.type === "request") {
    fetchEventUser().then((eventUser) => {
      return eventUser;
    });
  }

  console.log("eventUser not fetched");
  return state;
};

// 떵크
// const eventUserThuck = createAsyncThunk("request", async () => {
//   return fetchEventUser();
// });

// const eventUserSlice = createSlice({
//   name: "eventUser",
//   initialState: initialEventUserState,
//   reducers: {},
//   extraReducers: {
//     [eventUserThuck.pending.type]: (state) => {},
//     [eventUserThuck.fulfilled.type]: (state, action) => {},
//     [eventUserThuck.rejected.type]: (state) => {},
//   },
// });

// export default eventUserSlice.reducer;
