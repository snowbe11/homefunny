import { NameTag } from "component/NameTag";
import React from "react";

type LogParserProps = {
  log: string;
};

type EventType = "bath" | "custom" | "ban";

export const LogParser = ({ log }: LogParserProps) => {
  //const newLog = [values.who, values.event, values.log].join("|");
  const token = log.split("|");
  const who = token[0];
  const event = token[1] as EventType;
  const logText = token[2];

  let message = "";
  switch (event) {
    case "bath":
      message = "화장실 쓰는 날";
      break;
    case "ban":
      message = `${logText} 금지`;
      break;
    default:
      message = logText;
      break;
  }

  return (
    <span>
      <NameTag name={who} />
      {message}
    </span>
  );
};
