import Layout from "component/Layout";
import { Timeline } from "component/Timeline";
import { EventLogType, getTodayEvent, getEventAt } from "logic/api/eventLog";
import { splitLogToContents } from "logic/api/misc";
import React, { useState, useEffect } from "react";

import "./style.css";

export const TimelineView = () => {
  const [todayEvent, setTodayEvent] = useState<Array<EventLogType>>([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    getEventAt(new Date("2022-1-10")).then((log) => {
      console.log(log);

      setTodayEvent(log);
    });

    window.setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
  }, []);

  const filteredLogs = (user: string): Array<EventLogType> => {
    return todayEvent.filter((log) => {
      const { type, name } = splitLogToContents(log.log);
      if (type === "custom" && name === user) {
        return true;
      } else {
        return false;
      }
    });
  };

  const james = filteredLogs("james");
  const henry = filteredLogs("henry");

  return (
    <Layout>
      <div className="timeline-container">
        <div className="timeline-clock">{time}</div>
        <div className="timeline-contents">
          <Timeline logs={james} />
          <Timeline logs={henry} />
        </div>
      </div>
    </Layout>
  );
};

export default TimelineView;
