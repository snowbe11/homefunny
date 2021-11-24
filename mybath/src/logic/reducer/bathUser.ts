import { BathUser, EventUser } from "logic/type";

interface BathUserActionType {
  type: "request/whois";
  date: Date;
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

const getBathUser = (days: number, from: BathUser) => {
  if (days % 2 === 0) {
    if (from === "james") {
      return "james";
    } else {
      return "henry";
    }
  } else {
    if (from === "james") {
      return "henry";
    } else {
      return "james";
    }
  }
};

export const bathUserReducer = (
  state: BathUser = "james",
  action: BathUserActionType
) => {
  if (action.type === "request/whois") {
    const dayPassed = countingDays(action.date, action.eventUser.date);
    const userName = getBathUser(dayPassed, action.eventUser.name);
    return userName;
  } else {
    return state;
  }
};
