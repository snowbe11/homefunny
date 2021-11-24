import React, { useState, useEffect } from "react";
import { getEventLog } from "../../logic/access";
import { Collapse, Timeline } from "antd";

export const EventLog = (props: { date: Date; name: string }) => {
  const type: { date: Date; text: string }[] = [];
  const [logState, setLogState] = useState(type);

  useEffect(() => {
    getEventLog().then((log) => {
      setLogState(log);
    });
  }, [props]);

  return (
    <div>
      <Collapse defaultActiveKey={[1]}>
        <Collapse.Panel header="Event Log" key="1">
          <Timeline>
            {logState.map((e, i: number) => {
              return (
                <Timeline.Item key={i++}>
                  [{e.date.toLocaleString()}] {e.text}
                </Timeline.Item>
              );
            })}
          </Timeline>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};
