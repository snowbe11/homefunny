import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EventUser } from "component/EventUser";
import { Card } from "antd";
import { RootState } from "logic/store";
import { eventUserThuck } from "logic/reducer/eventUser";
import { getTodayBathUser } from "logic/reducer/bathUser";

import Layout from "component/Layout";
import { TodayBathUser } from "component/TodayBathUser";
import { toKrDateString } from "logic/api/misc";

const Bath = () => {
  const [pickDate] = useState(new Date());

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
        <Card title={toKrDateString(pickDate)}>
          <TodayBathUser pickDate={pickDate} />
          <EventUser />
        </Card>
      </div>
    </Layout>
  );
};

export default Bath;
