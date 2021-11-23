import React, { useState, useEffect } from "react";
import { getEventLog } from "../../logic/access";
import { Collapse, Button } from "antd";

export const EventLog = (props: { date: Date; name: string }) => {
  const type: { date: Date; text: string }[] = [];
  const [logState, setLogState] = useState(type);
  const [logVisiblity, setLogVisiblity] = useState(true);

  useEffect(() => {
    getEventLog().then((log) => {
      setLogState(log);
    });
  }, [props]);

  return (
    <div>
      <Button onClick={() => setLogVisiblity(!logVisiblity)}>
        {logVisiblity ? "감추기" : "보이기"}
      </Button>
      <Collapse>
        <pre>
          {logState.map((e, i: number) => {
            return (
              <span key={i++}>
                [{e.date.toLocaleString()}] {e.text}
              </span>
            );
          })}
        </pre>
      </Collapse>
    </div>
  );
};
