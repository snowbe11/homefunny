import { useCallback, useEffect, useState } from "react";
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
import { UserName } from "logic/type";

const Bath = () => {
  const [pickDate, setDate] = useState<Date>(new Date());

  const dispatch = useDispatch();

  const eventUser = useSelector((state: RootState) => state.eventUser);

  const updateTodayUser = useCallback(
    (date: Date) => {
      dispatch(
        getTodayBathUser({
          type: "request/whois",
          date: date.getTime(),
          eventUser: eventUser,
        })
      );
    },
    [dispatch, eventUser]
  );

  useEffect(() => {
    dispatch(eventUserThuck());
  }, [dispatch]);

  useEffect(() => {
    updateTodayUser(pickDate);
    // 이벤트 핸들러에 해당한다.
  }, [pickDate, eventUser, updateTodayUser]);

  const onClick = (name: string) => {
    addEvent(new Date(), name).then((e) => {
      if (e) {
        addToast(e.name);

        dispatch(eventUserThuck());
      } else {
        console.log("add event failed");
      }
    });
  };

  const addToast = (name: string) => {
    message.success(`오늘부터 ${UserName[name]}가 사용합니다.`);
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
            <NameTag pickDate={pickDate} />
          </blockquote>
          <EventUser />
          <Calendar setNewDate={setDate} />
        </Card>
        <Space>
          <Button
            style={{ background: "#1890ff", color: "white" }}
            onClick={() => onClick("james")}
          >
            준우부터 다시 시작
          </Button>
          <Button
            style={{ background: "#52c41a", color: "white" }}
            onClick={() => onClick("henry")}
          >
            건우부터 다시 시작
          </Button>
        </Space>

        <Divider />
        <EventLog />
      </Layout.Content>
    </Layout>
  );
};

export default Bath;
