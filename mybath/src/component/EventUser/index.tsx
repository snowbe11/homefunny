import React from "react";
import { Tag, Intent } from "@blueprintjs/core";

export const EventUser = (props: {
  eventUser: { date: Date; name: string };
}) => {
  const intent =
    props.eventUser.name === "james" ? Intent.PRIMARY : Intent.SUCCESS;

  return (
    <React.Fragment>
      <h5>
        <Tag key={props.eventUser.name} round={false} intent={intent}>
          {props.eventUser.name}
        </Tag>{" "}
        was use {props.eventUser.date.toLocaleDateString()}
      </h5>
    </React.Fragment>
  );
};
