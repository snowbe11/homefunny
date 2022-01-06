import React from "react";
import { Typography } from "antd";
import { RootState } from "logic/store";
import { useSelector } from "react-redux";
import { NameTag } from "component/NameTag";
import { toKrDateString } from "logic/api/misc";

const { Text } = Typography;

export const EventUser = () => {
  const eventUser = useSelector((state: RootState) => state.eventUser);

  return (
    <React.Fragment>
      <Text>
        마지막으로 <NameTag name={eventUser.name} />가{" "}
        {toKrDateString(new Date(eventUser.date))} 에 사용했습니다.
      </Text>
    </React.Fragment>
  );
};
