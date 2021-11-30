import { Tag } from "antd";
import { RootState } from "logic/store";
import { useSelector } from "react-redux";

export const NameTag = () => {
  const bathUser = useSelector((state: RootState) => state.bathUser);

  return (
    <div>
      <div>
        <span>Today is </span>
        <Tag color={bathUser.name === "james" ? "processing" : "success"}>
          {bathUser.name}
        </Tag>
      </div>
      <div>{bathUser.dayPassed} days passed</div>
    </div>
  );
};
