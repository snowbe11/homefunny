import { useState, useEffect } from "react";
import { NameTag } from "component/NameTag";
import { Calendar } from "component/Calendar";
import { EventUser } from "component/EventUser";
import { EventLog } from "component/EventLog";
import {
  Breadcrumb,
  Card,
  Button,
  Divider,
  message,
  Space,
} from "antd";
import { addEvent, getEventState } from "logic/access";

import "antd/dist/antd.css";
import { HomeOutlined } from "@ant-design/icons";

const countingDays = (date: Date, from: Date) => {
  const fromDay = new Date(from.toLocaleDateString());
  const currentDay = new Date(date.toLocaleDateString());
  const one_day = 1000 * 60 * 60 * 24;
  const diff = (currentDay.getTime() - fromDay.getTime()) / one_day;
  const sign = Math.sign(diff);
  return Math.floor(Math.abs(diff)) * sign;
};

const whoIs = (days: number, from: string) => {
  if (days % 2 === 0) {
    if (from === "james") {
      return "james";
    } else {
      return "henry";
    }
  } else {
    if (from === "james") {
      return "henry";
    } else {
      return "james";
    }
  }
};

const Bath = () => {
  const [checkDate, setDate] = useState<Date>(new Date());
  const [todayState, setTodayState] = useState({
    name: "",
    dayPassed: 0,
  });
  const [eventState, setEventState] = useState({
    date: new Date("1997-1-1"),
    name: "undefined",
  });

  const getEventContext = async () => {
    const { eventDate, eventName } = await getEventState();

    // const log = `get context {${eventDate}: ${eventName}}`;
    // console.log(log);

    setEventState({ date: eventDate, name: eventName });

    const dayPassed = countingDays(checkDate, eventDate);
    const name = whoIs(dayPassed, eventName);
    setTodayState({ name, dayPassed });
  };

  useEffect(() => {
    getEventContext();
    // eslint-disable-next-line
  }, [checkDate]);

  const onClick = (name: string) => {
    addEvent(new Date(), name).then((e) => {
      if (e) {
        console.log(`${e.date}, ${e.name}`);

        getEventContext().then((e) => {
          addToast();
        });
      }
    });
  };

  const addToast = () => {
    message.success(`오늘부터 ${eventState.name}가 사용합니다.`);
  };

  return (
    <div className="bath-app">
      <Breadcrumb>
        <Breadcrumb.Item>Home Funny</Breadcrumb.Item>
        <Breadcrumb.Item>
          <Space>
            <HomeOutlined />
            Home
          </Space>
        </Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Card className="bp3-text-large bp3-running-text">
          <blockquote>
            <NameTag name={todayState.name} />
            <div>{todayState.dayPassed} days passed</div>
          </blockquote>
          <EventUser eventUser={eventState} />
          <Calendar setNewDate={setDate} />
        </Card>
      </div>

      <div>
        <Divider />
        <Button style={{ background: "green", color: "white" }} onClick={() => onClick("james")}>
          james confirm
        </Button>
        <Button color="processing" onClick={() => onClick("henry")}>
          henry confirm
        </Button>
      </div>

      <Divider />
      <div>
        <EventLog {...eventState} />
      </div>
    </div>
  );
};

export default Bath;
