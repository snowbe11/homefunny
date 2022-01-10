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

  try {
    const user = events[0].name;

    const style = {
      backgroundColor: user === "james" ? "white" : "whitesmoke",
    };

    const now = new Date();

    let currentActived = 0;
    events.map((log, index) => {
      const tagTime = new Date(log.time);
      if (tagTime < now) {
        currentActived = index;
      }

      return log;
    });

    const currentWork = (
      <div className="timeline-current">{events[currentActived].text}</div>
    );

    return (
      <div className="timeline-pannel" style={style}>
        <p>
          <NameTag name={user} />
        </p>
        <p>{currentWork}</p>
        <Time>
          {events.map((log, index) => {
            const tagTime = new Date(log.time);

            let color = "blue";
            if (currentActived !== index && tagTime < now) {
              color = "green";
            } else if (tagTime > now) {
              color = "gray";
            }

            return (
              <Time.Item key={index} color={color}>
                <span>{tagTime.toLocaleTimeString()}</span>{" "}
                <NameTag name={log.name} /> <span>{log.text}</span>
              </Time.Item>
            );
          })}
        </Time>
      </div>
    );
  } catch (e) {
    console.log(e);
  }

  return <div></div>;
};
