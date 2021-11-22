import React, { useState, useEffect } from "react";
import { getEventLog } from "../../logic/access";
import { Text, Collapse, Button } from "@blueprintjs/core";

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
      <Button
        onClick={() => setLogVisiblity(!logVisiblity)}
        minimal={true}
        outlined={true}
      >
        {logVisiblity ? "감추기" : "보이기"}
      </Button>
      <Collapse isOpen={logVisiblity}>
        <pre>
          {logState.map((e, i: number) => {
            return (
              <Text key={i++}>
                [{e.date.toLocaleString()}] {e.text}
              </Text>
            );
          })}
        </pre>
      </Collapse>
    </div>
  );
};
