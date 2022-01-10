import React from "react";
import { Timeline as Time } from "antd";
import { EventLogType } from "logic/api/access";
import { EventFormType, splitLogToContents } from "logic/api/misc";
import { NameTag } from "component/NameTag";

import "./style.css";

type TimelineProps = {
  logs: Array<EventLogType>;
};

export const Timeline = ({ logs }: TimelineProps) => {
  let events = Array<EventFormType>();
  logs.map((log) => {
    events.push(splitLogToContents(log.log));
    return log;
  });

  events.sort((a, b): number => {
    const l_date = new Date(a.time);
    const r_date = new Date(b.time);

    if (l_date > r_date) {
      return 1;
    } else if (l_date < r_date) {
      return -1;
    } else {
      return 0;
    }
  });

  const style = {
    backgroundColor: events[0].name === "james" ? "white" : "whitesmoke",
  };

  return (
    <div className="timeline-pannel" style={style}>
      <Time>
        {events.map((log, index) => {
          return (
            <Time.Item key={index}>
              <span>{new Date(log.time).toLocaleTimeString()}</span>
              <NameTag name={log.name} />
              <span>{log.text}</span>
            </Time.Item>
          );
        })}
      </Time>
    </div>
  );
};
