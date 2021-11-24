import React from "react";
import { Button, Text, Box } from "grommet";

export const EventUser = (props: { date: Date; name: string }) => {
  return (
    <React.Fragment>
      <h5>
        <Button hoverIndicator="light-1" key={props.name}>
          <Box gap="small">
            <Text>{props.name}</Text>
          </Box>
        </Button>{" "}
        was use {props.date.toLocaleDateString()}
      </h5>
    </React.Fragment>
  );
};
