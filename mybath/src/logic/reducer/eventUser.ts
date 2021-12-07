import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEventState } from "logic/access";
import { EventUser } from "logic/type";

// eventUser 는 일단 fetch 를 사용하므로 슬라이스를 사용하는 것에 적당하다.

const initialEventUserState: EventUser = {
  date: new Date("1917-1-1").getTime(),
  name: "james",
};

const fetchEventUser = async (): Promise<EventUser> => {
  const { eventDate, eventName } = await getEventState();
  return { date: eventDate.getTime(), name: eventName };
};

export const eventUserThuck = createAsyncThunk("request", async () => {
  return await fetchEventUser();
});

const eventUserSlice = createSlice({
  name: "eventUser",
  initialState: initialEventUserState,
  reducers: {},
  extraReducers: {
    [eventUserThuck.pending.type]: (state) => {},
    [eventUserThuck.fulfilled.type]: (state, action: PayloadAction<EventUser>) => {
      const payload = action.payload;
      state.date = payload.date;
      state.name = payload.name;
    },
    [eventUserThuck.rejected.type]: (state) => {
      console.log("eventUserThuck.rejected.type");
    },
  },
});

export default eventUserSlice.reducer;
