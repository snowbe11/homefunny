export type BathUser = "james" | "henry";

export type DateString = string;

export type EventUser = {
  date: DateString;
  name: BathUser;
};

export type EventLog = {
  date: DateString;
  log: string;
};
