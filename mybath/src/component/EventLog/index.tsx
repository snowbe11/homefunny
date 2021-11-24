import React, { useState, useEffect } from "react";
import { getEventLog } from "../../logic/access";
import { Text, Box, Button, List, Collapsible } from "grommet";

const initialLogStateValue: { id: number; date: string; text: string }[] = [];

export const EventLog = (props: { date: Date; name: string }) => {
  const [logState, setLogState] = useState(initialLogStateValue);
  const [logVisiblity, setLogVisiblity] = useState(true);

  useEffect(() => {
    getEventLog().then((log) => {
      const textlogs = log.map((e, i) => {
        return { id: i, date: e.date.toLocaleString(), text: e.text };
      });
      setLogState(textlogs);
    });
  }, [props]);

  return (
    <Box gap="small">
      <Button
        onClick={() => setLogVisiblity(!logVisiblity)}
        label={logVisiblity ? "로그 감추기" : "로그 보이기"}
      ></Button>
      <Collapsible open={logVisiblity}>
        <Box>
          <List
            data={logState}
            primaryKey={(item) => {
              return (
                <Text key={item.id} size="small">
                  {item.date}
                </Text>
              );
            }}
            secondaryKey="text"
          />
        </Box>
      </Collapsible>
    </Box>
  );
};
