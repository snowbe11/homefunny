import React, {useState} from 'react'
import { NameTag } from 'component/NameTag';
import { Calendar } from 'component/Calendar';
import { Card } from '@blueprintjs/core';
import "./style.css"

import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";

const initial_date = new Date("2021-11-19");
const start_from = "james";

const countingDays = (date:Date) => {
    const one_day = 1000 * 60 * 60 * 24;
    return Math.round((date.getTime() - initial_date.getTime()) / one_day);
}

const whoIs = (days:number) => {
    if ((days % 2) == 0) {
        if (start_from === "james") {
            return "james";
        }
        else {
            return "henry";
        }
    }
    else {
        if (start_from === "james") {
            return "henry";
        }
        else {
            return "james";
        }
    }
}

const Bath = () => {
    const [checkDate, setDate] = useState<Date>(new Date());

    const day_count = countingDays(checkDate);
    const person = whoIs(day_count);

    return (
        <div className="bath-app">
            <Card className="bp3-text-large bp3-running-text">
                <h3>{start_from} was use {initial_date.toLocaleDateString()}</h3>
                <blockquote>
                    <div>{day_count} days passed</div>
                    <NameTag name={person} />
                </blockquote>
                <br />
                <Calendar setNewDate={setDate}/>
            </Card>
        </div>
    );
};

export default Bath;
