import React from "react";
import { Typography } from "antd";
import { RootState } from "logic/store";
import { useSelector } from "react-redux";
import { NameTag } from "component/NameTag";

const { Text } = Typography;

export const EventUser = () => {
  const eventUser = useSelector((state: RootState) => state.eventUser);

  return (
    <React.Fragment>
      <Text>
        마지막으로 <NameTag name={eventUser.name} />가{" "}
        {new Date(eventUser.date).toLocaleDateString()} 에 사용했습니다.
      </Text>
    </React.Fragment>
  );
};
