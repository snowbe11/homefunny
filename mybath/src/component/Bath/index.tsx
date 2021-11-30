import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NameTag } from "component/NameTag";
import { Calendar } from "component/Calendar";
import { EventUser } from "component/EventUser";
import { EventLog } from "component/EventLog";
import { HomeNavigation } from "component/HomeNavigation";
import { Card, Button, Divider, message, Space, Layout } from "antd";
import { addEvent } from "logic/access";
import { RootState } from "logic/store";
import { eventUserThuck } from "logic/reducer/eventUser";
import { getTodayBathUser } from "logic/reducer/bathUser";

import "antd/dist/antd.css";

const Bath = () => {
  const [pickDate, setDate] = useState<Date>(new Date());

  const dispatch = useDispatch();

  const eventUser = useSelector((state: RootState) => state.eventUser);

  useEffect(() => {
    dispatch(eventUserThuck());

    // 의도대로 페이지 로드때 한번만 불리우도록
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(
      getTodayBathUser({
        type: "request/whois",
        date: pickDate.getTime(),
        eventUser: eventUser,
      })
    );

    // 이벤트 핸들러에 해당한다.
    // eslint-disable-next-line
  }, [pickDate]);

  const onClick = (name: string) => {
    addEvent(new Date(), name).then((e) => {
      if (e) {
        console.log(`${e.date}, ${e.name}`);

        // 애초에 이건 dispatch 할 녀석이 아닌 것 같다.
        // addEvent 가 dispatch 할 녀석이고, 이건 로컬의 상태값인데...
        // 리듀서에 저장을 할만하다고 가정해보자

        const checked = dispatch(
          getTodayBathUser({
            type: "request/whois",
            date: e.date.getTime(),
            eventUser: eventUser,
          })
        );

        console.log(checked);
        addToast();
      }
    });
  };

  const addToast = () => {
    message.success(`오늘부터 ${eventUser.name}가 사용합니다.`);
  };

  const style = {
    display: "inline-block",
    margin: "30px",
  };

  return (
    <Layout style={style}>
      <Layout.Content>
        <HomeNavigation />
        <Card className="bp3-text-large bp3-running-text">
          <blockquote>
            <NameTag />
          </blockquote>
          <EventUser />
          <Calendar setNewDate={setDate} />
        </Card>
        <Space>
          <Button
            style={{ background: "#1890ff", color: "white" }}
            onClick={() => onClick("james")}
          >
            james confirm
          </Button>
          <Button
            style={{ background: "#52c41a", color: "white" }}
            onClick={() => onClick("henry")}
          >
            henry confirm
          </Button>
        </Space>

        <Divider />
        <EventLog />
      </Layout.Content>
    </Layout>
  );
};

export default Bath;
