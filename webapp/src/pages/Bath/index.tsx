import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NameTag } from "component/NameTag";
import { Calendar } from "component/Calendar";
import { EventUser } from "component/EventUser";
import { EventLog } from "component/EventLog";
import { Card, Button, Divider, message, Space } from "antd";
import { RootState } from "logic/store";
import { eventUserThuck } from "logic/reducer/eventUser";
import { getTodayBathUser } from "logic/reducer/bathUser";

import "antd/dist/antd.css";

import Layout from "component/Layout";
import { AddEvent } from "component/AddEvent";
import { TodayBathUser } from "component/TodayBathUser";

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

  return (
    <Layout>
      <div className="bath-app">
        <Space direction="vertical">
          <Calendar setNewDate={setDate} />

          <Card title={pickDate.toLocaleDateString()}>
            <TodayBathUser pickDate={pickDate} />
            <EventUser />
          </Card>
          <AddEvent date={pickDate} />
        </Space>
        <Divider />
        <EventLog />
      </div>
    </Layout>
  );
};

export default Bath;
