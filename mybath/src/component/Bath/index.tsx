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
import { BathUserActionType, getTodayBathUser } from "logic/reducer/bathUser";

import "antd/dist/antd.css";

const Bath = () => {
  const [pickDate, setDate] = useState<Date>(new Date());
  const [todayState, setTodayState] = useState({
    name: "",
    dayPassed: 0,
  });

  const dispatch = useDispatch();

  const eventUser = useSelector((state: RootState) => state.eventUser);

  useEffect(() => {
    dispatch(eventUserThuck());
  }, [dispatch]);

  useEffect(() => {
    const payload: BathUserActionType = {
      type: "request/whois",
      date: pickDate.toLocaleString(),
      eventUser: eventUser,
    };

    dispatch(getTodayBathUser(payload));
  }, [dispatch, eventUser, pickDate]);

  const onClick = (name: string) => {
    addEvent(new Date(), name).then((e) => {
      if (e) {
        console.log(`${e.date}, ${e.name}`);
        //dispatch({ type: "request" });

        // 여기가 리덕스 + fetch 를 이용해 비동기처리를 할 때 문제점으로 보인다.
        // 핸들링을 하려면 좀 기교가 필요해보인다.

        addToast();
        console.log("async?");
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
            <div>{todayState.dayPassed} days passed</div>
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
