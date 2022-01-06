import React, { useState, useEffect } from "react";
import { getEventLog } from "../../logic/api/access";
import { Collapse, Timeline } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "logic/store";
import { LogParser } from "component/LogParser";

export const EventLog = () => {
  const type: { date: Date; text: string }[] = [];
  const [logState, setLogState] = useState(type);

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
            {logState.map((e, i: number) => {
              return (
                <Timeline.Item key={i++}>
                  {e.date.toLocaleString()} <LogParser log={e.text} />
                </Timeline.Item>
              );
            })}
          </Timeline>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};
