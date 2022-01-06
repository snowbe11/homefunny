import { Tag } from "antd";
import { RootState } from "logic/store";
import { useSelector } from "react-redux";
import { NameTag } from "component/NameTag";

export const TodayBathUser = (props: { pickDate: Date }) => {
  const bathUser = useSelector((state: RootState) => state.bathUser);

  return (
    <div>
      화장실? <NameTag name={bathUser.name} /> 차례
    </div>
  );
};
