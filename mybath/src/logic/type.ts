export type BathUser = "james" | "henry";

export type EventUser = {
    date: Date,
    name: BathUser
};

export type EventLog = {
    date: Date,
    log: string
};