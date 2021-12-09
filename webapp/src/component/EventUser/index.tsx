import React from "react";
import { Tag, Typography } from "antd";
import { RootState } from "logic/store";
import { useSelector } from "react-redux";
import { UserName } from "logic/type";

const { Text } = Typography;

export const EventUser = () => {
  const eventUser = useSelector((state: RootState) => state.eventUser);
  const intent = eventUser.name === "james" ? "processing" : "success";

  return (
    <React.Fragment>
      <Text>
        마지막으로 <Tag color={intent}>{UserName[eventUser.name]}</Tag>가{" "}
        {new Date(eventUser.date).toLocaleDateString()} 에 사용했습니다.
      </Text>
    </React.Fragment>
  );
};
