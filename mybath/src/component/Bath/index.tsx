import React, {useState} from 'react'
import { NameTag } from 'component/NameTag';
import { Calendar } from 'component/Calendar';
import { EventUser } from 'component/EventUser';
import { EventLog } from 'component/EventLog';
import { Card, ButtonGroup, Button, Divider } from '@blueprintjs/core';
import { addEvent } from 'logic/access';
import "./style.css"

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

const countingDays = (date:Date, from:Date) => {
    const one_day = 1000 * 60 * 60 * 24;
    return Math.round((date.getTime() - from.getTime()) / one_day);
}

const whoIs = (days:number, from:string) => {
    if ((days % 2) === 0) {
        if (from === "james") {
            return "james";
        }
        else {
            return "henry";
        }
    }
    else {
        if (from === "james") {
            return "henry";
        }
        else {
            return "james";
        }
    }
}

const Bath = () => {
    const [checkDate, setDate] = useState<Date>(new Date());
    const [eventUser, setEventUser] = useState({date:new Date("1997-1-1"), name: "undefined"})

    const day_count = countingDays(checkDate, eventUser.date);
    const person = whoIs(day_count, eventUser.name);

    const onClick = (name:string) => {
        addEvent(new Date(), name).then(e => {
            if (e) {
                console.log(`${e.date}, ${e.name}`);

                setEventUser(e);
            }
        });
    }

    return (
        <div className="bath-app">
            <div>
                <Card className="bp3-text-large bp3-running-text">
                    <EventUser eventUser={eventUser} setEventUser={setEventUser}/>
                    <blockquote>
                        <div>{day_count} days passed</div>
                        <NameTag name={person} />
                    </blockquote>
                    <br />
                    <Calendar setNewDate={setDate}/>
                </Card>
            </div>

            <ButtonGroup vertical={true} large={true}>
                <Divider />
                <Button intent={"success"} onClick={() => onClick("james")}>james confirm</Button>
                <Button intent={"primary"} onClick={() => onClick("henry")}>henry confirm</Button>
            </ButtonGroup>

            <div>
                <EventLog {...eventUser}/>
            </div>
        </div>
    );
};

export default Bath;
