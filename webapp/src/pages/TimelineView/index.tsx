import Layout from "component/Layout";
import { Timeline } from "component/Timeline";
import { EventLogType, getTodayEvent } from "logic/api/eventLog";
import React, { useState, useEffect } from "react";

import "./style.css";

export const TimelineView = () => {
  const [todayEvent, setTodayEvent] = useState<Array<EventLogType>>([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    getTodayEvent().then((log) => {
      console.log(log);

      setTodayEvent(log);
    });

    window.setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
  }, []);

  const filteredLogs = (name: string): Array<EventLogType> => {
    return todayEvent.filter((log) => {
      const { eventType, eventUser } = log;
      if (eventType === "custom" && eventUser === name) {
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
