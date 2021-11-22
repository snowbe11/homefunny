import React, { useEffect } from 'react'
import { getEventState } from "../../logic/access";
import { Tag, Intent } from '@blueprintjs/core';

export const EventUser = (props: {eventUser: {date: Date, name: string}, setEventUser: any}) => {

    useEffect(() => {
        const getEventContext = async () => {
            const { eventDate, eventName } = await getEventState();

            const log = `get context {${eventDate}: ${eventName}}`;
            console.log(log);
    
            props.setEventUser({date:eventDate, name:eventName});
        }

        getEventContext();
        // eslint-disable-next-line
    }, [])

    const intent = (props.eventUser.name === "james") ? Intent.PRIMARY : Intent.SUCCESS;

    return (
        <React.Fragment>
            <h5><Tag key={props.eventUser.name} round={false} intent={intent}>{props.eventUser.name}</Tag> was use {props.eventUser.date.toLocaleDateString()}</h5>
        </React.Fragment>
    )
}
