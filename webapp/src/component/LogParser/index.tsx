import { NameTag } from "component/NameTag";
import { splitLogToContents } from "logic/api/misc";
import React from "react";

type LogParserProps = {
  log: string;
};

export const LogParser = ({ log }: LogParserProps) => {
  const { name, type, text } = splitLogToContents(log);
  let message = "";
  switch (type) {
    case "bath":
      message = "화장실 쓰는 날";
      break;
    case "ban":
      message = `${text} 금지`;
      break;
    default:
      message = text;
      break;
  }

  return (
    <span>
      <NameTag name={name} />
      {message}
    </span>
  );
};
