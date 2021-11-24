import React from "react";
import { Tag } from "antd";

export const EventUser = (props: {
  eventUser: { date: Date; name: string };
}) => {
  const intent = props.eventUser.name === "james" ? "processing" : "success";

  return (
    <React.Fragment>
      <h5>
        <Tag color={intent}>{props.eventUser.name}</Tag> was use{" "}
        {props.eventUser.date.toLocaleDateString()}
      </h5>
    </React.Fragment>
  );
};
