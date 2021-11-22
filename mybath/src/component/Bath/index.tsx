import { useState, useEffect } from "react";
import { NameTag } from "component/NameTag";
import { Calendar } from "component/Calendar";
import { EventUser } from "component/EventUser";
import { EventLog } from "component/EventLog";
import {
  Card,
  ButtonGroup,
  Button,
  Divider,
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Alignment,
  Classes,
  Intent,
  Toaster,
  Position,
  IToastProps,
} from "antd";
import { addEvent, getEventState } from "logic/access";
import "./style.css";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

const countingDays = (date: Date, from: Date) => {
  const fromDay = new Date(from.getFullYear(), from.getMonth(), from.getDay());
  const currentDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDay()
  );
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

// useRef 와는 다르다.
// 블루프린트는 ref 를 설정할 수 없다.
let toasterRef: Toaster;

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

  const toastBuild: IToastProps = {
    icon: "tick",
    intent: Intent.SUCCESS,
    message: `오늘부터 ${eventState.name}가 사용합니다.`,
    timeout: 3000,
  };

  // this 를 넘겨주는 처리를 어떻게 할 수 있을까?
  // clas-component 에서는 this 를 주고 받고 할 수 있었는데 그 방법으로 될 가능성이 있다.
  const toasterRefHandler = (ref: Toaster) => {
    toasterRef = ref;
  };

  const addToast = () => {
    if (toasterRef) {
      toasterRef.show(toastBuild);
    }
  };

  return (
    <div className="bath-app">
      <Toaster
        ref={toasterRefHandler}
        autoFocus={false}
        position={Position.TOP}
        usePortal={false}
      />
      <Navbar>
        <NavbarGroup align={Alignment.LEFT}>
          <NavbarHeading>Home Funny</NavbarHeading>
          <NavbarDivider />
          <Button
            className={Classes.MINIMAL}
            icon="home"
            text="Home"
            intent="primary"
          />
        </NavbarGroup>
      </Navbar>
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

      <ButtonGroup vertical={false} large={true}>
        <Divider />
        <Button intent={"success"} onClick={() => onClick("james")}>
          james confirm
        </Button>
        <Button intent={"primary"} onClick={() => onClick("henry")}>
          henry confirm
        </Button>
      </ButtonGroup>

      <Divider />
      <div>
        <EventLog {...eventState} />
      </div>
    </div>
  );
};

export default Bath;
