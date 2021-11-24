import { useState, useEffect } from "react";
import { NameTag } from "component/NameTag";
import { Calendar } from "component/Calendar";
import { EventUser } from "component/EventUser";
import { EventLog } from "component/EventLog";
import { addEvent, getEventState } from "logic/access";
import {
  Grommet,
  Card,
  CardBody,
  Button,
  Nav,
  Anchor,
  Box,
  Notification,
  Text,
} from "grommet";

import { Home } from "grommet-icons";
import { grommet, base } from "grommet/themes";
import "./style.css";

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
  const [toast, setToast] = useState(false);

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

  const RenderNotify = (
    <Notification
      toast
      title="notification"
      message={`오늘부터 ${eventState.name}가 사용합니다.`}
      onClose={() => setToast(false)}
    />
  );

  const addToast = () => {
    setToast(true);
  };

  return (
    <Grommet className="bath-app" theme={base}>
      {toast && RenderNotify}
      <Box>
        <Nav direction="row">
          <Anchor>
            <Text>Home Funny / </Text>
          </Anchor>
          <Home />
          <Anchor>Home</Anchor>
        </Nav>
      </Box>
      <div>
        <Card className="bp3-text-large bp3-running-text" pad="medium">
          <CardBody>
            <blockquote>
              <NameTag name={todayState.name} />
              <Text>{todayState.dayPassed} days passed</Text>
            </blockquote>
            <EventUser {...eventState} />
            <Calendar setNewDate={setDate} />
          </CardBody>
        </Card>
      </div>

      <Box margin="medium" gap="small">
        <Nav direction="row">
          <Button
            onClick={() => onClick("james")}
            color="neutral-3"
            label="james confirm"
          ></Button>
          <Button
            onClick={() => onClick("henry")}
            color="status-ok"
            label="henry confirm"
          ></Button>
        </Nav>
      </Box>

      <Box margin="medium">
        <EventLog {...eventState} />
      </Box>
    </Grommet>
  );
};

export default Bath;
