export const toKrDateString = (date: Date) : string => {
    return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });    
}

export type EventType = "bath" | "custom" | "ban";

export type EventFormType = {
  name: "james" | "henry",
  type: EventType,
  text: string,
  time: string,
}

export const splitLogToContents = (log: string) : EventFormType => {
  const token = log.split("|");
  return {
    name: token[0] as "james" | "henry",
    type: token[1] as EventType,
    text: token[2],
    time: token[3]
  };
}