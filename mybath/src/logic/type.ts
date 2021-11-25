export type BathUser = {
  name: "james" | "henry"
};

export type EventUser = {
  date: number;
  user: BathUser;
};

export type EventLog = {
  date: number;
  log: string;
};
