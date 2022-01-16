import { NameTag } from "component/NameTag";
import { EventLogType } from "logic/api/eventLog";
import React from "react";

export const LogParser = ({
  loggingTime,
  eventType,
  eventTime,
  eventUser,
  logText,
}: EventLogType) => {
  let message = "";
  switch (eventType) {
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
      <NameTag name={eventUser} />
      {message}
    </span>
  );
};
