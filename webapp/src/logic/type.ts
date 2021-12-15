export type BathUser = {
  name: string;
  dayPassed: number;
};

export type EventUser = {
  date: number;
  name: "james" | "henry";
};

export type EventLog = {
  date: number;
  log: string;
};

type UserNameType = {
  [index: string]: string;
};

export const UserName: UserNameType = {
  james: "준우",
  henry: "건우",
};

export type WordTestType = {
  [index: string]: string;
};
