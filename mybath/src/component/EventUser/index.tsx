import React from "react";
import { Tag } from "antd";
import { RootState } from "logic/store";
import { useSelector } from "react-redux";

export const EventUser = () => {
  const eventUser = useSelector((state: RootState) => state.eventUser);
  const intent = eventUser.name === "james" ? "processing" : "success";

  return (
    <React.Fragment>
      <h5>
        <Tag color={intent}>{eventUser.name}</Tag> was use{" "}
        {eventUser.date.toLocaleDateString()}
      </h5>
    </React.Fragment>
  );
};
