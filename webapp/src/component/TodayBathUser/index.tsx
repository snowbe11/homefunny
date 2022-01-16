import { Typography } from "antd";
import { RootState } from "logic/store";
import { useSelector } from "react-redux";
import { NameTag } from "component/NameTag";
import Paragraph from "antd/lib/typography/Paragraph";

export const TodayBathUser = (props: { pickDate: Date }) => {
  const bathUser = useSelector((state: RootState) => state.bathUser);

  return (
    <Typography>
      <Paragraph>
        <Typography.Title level={5}>
          오늘은 <NameTag name={bathUser.name} /> 차례 입니다.
        </Typography.Title>
      </Paragraph>
    </Typography>
  );
};
