import { Tag } from "antd";

export const NameTag = (props: { name: string }) => {
  return (
    <div>
      <span>today is </span>
      <Tag color={props.name === "james" ? "processing" : "success"}>
        {props.name}
      </Tag>
    </div>
  );
};
