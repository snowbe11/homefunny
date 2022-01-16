import React, { useState } from "react";
import { Slider, Timeline as Time } from "antd";
import { EventLogType } from "logic/api/eventLog";
import { NameTag } from "component/NameTag";

import "./style.css";

const dingAudio = new Audio(
  "http://www.besplatnestvari.net/zvuci_1/mp3SMS/Sonic.Ring.mp3"
);

type TimelineProps = {
  logs: Array<EventLogType>;
};

export const Timeline = ({ logs }: TimelineProps) => {
  const [alarmed, setAlarmed] = useState(false);

  logs.sort((a, b): number => {
    const l_date = new Date(a.eventTime);
    const r_date = new Date(b.eventTime);

    if (l_date > r_date) {
      return 1;
    } else if (l_date < r_date) {
      return -1;
    } else {
      return 0;
    }
  });

  if (logs.length > 0) {
    try {
      const user = logs[0].eventUser;

      const style = {
        backgroundColor: user === "james" ? "white" : "ghostwhite",
      };

      const now = new Date();

      let currentActived = 0;
      logs.map((log, index) => {
        const tagTime = new Date(log.eventTime);
        if (tagTime < now) {
          currentActived = index;
        }

        return log;
      });

      let value = 0;

      if (currentActived + 1 < logs.length) {
        const from = logs[currentActived].eventTime;
        const to = logs[currentActived + 1].eventTime;

        const duration = to.valueOf() - from.valueOf();
        const pregressed = new Date().valueOf() - from.valueOf();

        value = (pregressed / duration) * 100;

        if (value > 90) {
          if (!alarmed) {
            dingAudio.play();

            setAlarmed(true);
          }
        } else if (alarmed) {
          setAlarmed(false);
        }
      }

      const currentWork = (
        <>
          <div className="timeline-current">{logs[currentActived].logText}</div>
          <div className="icon-wrapper">
            <Slider value={value} />
          </div>
        </>
      );

      return (
        <div className="timeline-pannel" style={style}>
          <p>
            <NameTag name={user} />
          </p>
          <p>{currentWork}</p>
          <Time>
            {logs.map((log, index) => {
              const tagTime = log.eventTime;

              let color = "blue";
              if (currentActived !== index && tagTime < now) {
                color = "green";
              } else if (tagTime > now) {
                color = "gray";
              }

              return (
                <Time.Item key={index} color={color}>
                  <span>{tagTime.toLocaleTimeString()}</span>{" "}
                  <NameTag name={log.eventUser} /> <span>{log.logText}</span>
                </Time.Item>
              );
            })}
          </Time>
        </div>
      );
    } catch (e) {
      console.log(e);
    }
  }

  return <div></div>;
};
