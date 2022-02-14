import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Calendar } from "component/Calendar";
import { EventLog } from "component/EventLog";
import { Divider, Space } from "antd";
import { RootState } from "logic/store";
import { eventUserThuck } from "logic/reducer/eventUser";
import { getTodayBathUser } from "logic/reducer/bathUser";

import Layout from "component/Layout";
import { AddEvent } from "component/AddEvent";

const Scheduler = () => {
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

          <AddEvent date={pickDate} />
        </Space>
        <Divider />
        <EventLog />
      </div>
    </Layout>
  );
};

export default Scheduler;
