import { Tag } from "antd";
import { RootState } from "logic/store";
import { useSelector } from "react-redux";
import { UserName } from "logic/type";
import { Typography } from "antd";

const { Text, Title } = Typography;

export const NameTag = (props: { pickDate: Date }) => {
  const bathUser = useSelector((state: RootState) => state.bathUser);

  return (
    <div>
      <Title level={4}>
        {props.pickDate.toLocaleDateString()}{" "}
        <Tag color={bathUser.name === "james" ? "processing" : "success"}>
          {UserName[bathUser.name]}
        </Tag>{" "}
        차례 입니다.
      </Title>
      <Text type="secondary">
        마지막 확인한 날짜로부터 {bathUser.dayPassed} 일이 경과했습니다.
      </Text>
    </div>
  );
};
