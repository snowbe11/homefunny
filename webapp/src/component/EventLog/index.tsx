import React, { useState, useEffect } from "react";
import { EventLogType, getEventLog } from "../../logic/api/eventLog";
import { Collapse, Timeline } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "logic/store";
import { LogParser } from "component/LogParser";

export const EventLog = () => {
  const [logState, setLogState] = useState<Array<EventLogType>>([]);

  const eventUser = useSelector((state: RootState) => state.eventUser);

  useEffect(() => {
    getEventLog().then((log) => {
      setLogState(log);
    });
  }, [eventUser]);

  return (
    <div>
      <Collapse defaultActiveKey={[1]}>
        <Collapse.Panel header="Event Log" key="1">
          <Timeline>
            {logState.map((log, i: number) => {
              return (
                <Timeline.Item key={i++}>
                  {log.loggingTime.toLocaleString()} <LogParser {...log} />
                </Timeline.Item>
              );
            })}
          </Timeline>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};
