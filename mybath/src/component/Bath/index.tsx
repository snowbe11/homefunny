import { useState } from "react";
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
} from "@blueprintjs/core";
import { addEvent } from "logic/access";
import "./style.css";

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

const countingDays = (date: Date, from: Date) => {
  const one_day = 1000 * 60 * 60 * 24;
  return Math.round((date.getTime() - from.getTime()) / one_day);
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
  const [eventUser, setEventUser] = useState({
    date: new Date("1997-1-1"),
    name: "undefined",
  });

  const day_count = countingDays(checkDate, eventUser.date);
  const person = whoIs(day_count, eventUser.name);

  const onClick = (name: string) => {
    addEvent(new Date(), name).then((e) => {
      if (e) {
        console.log(`${e.date}, ${e.name}`);

        setEventUser(e);

        addToast();
      }
    });
  };

  const toastBuild: IToastProps = {
    icon: "tick",
    intent: Intent.SUCCESS,
    message: `오늘 날자, ${eventUser.name}(으)로 사용자를 바꿨습니다.`,
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
        usePortal={true}
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
          <Button className={Classes.MINIMAL} icon="calendar" text="My Bath" />
        </NavbarGroup>
      </Navbar>
      <div>
        <Card className="bp3-text-large bp3-running-text">
          <blockquote>
            <NameTag name={person} />
            <div>{day_count} days passed</div>
          </blockquote>
          <br />
          <EventUser eventUser={eventUser} setEventUser={setEventUser} />
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
        <EventLog {...eventUser} />
      </div>
    </div>
  );
};

export default Bath;
