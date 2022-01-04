import { Tag } from "antd";
import { UserName } from "logic/type";

export const NameTag = (props: { name: string }) => {
  return (
    <Tag color={props.name === "james" ? "processing" : "success"}>
      {UserName[props.name]}
    </Tag>
  );
};
