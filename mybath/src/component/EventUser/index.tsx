import React, { useEffect } from 'react'
import { getEventState } from "../../logic/access";

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

    return (
        <React.Fragment>
            <h3>{props.eventUser.name} was use {props.eventUser.date.toLocaleDateString()}</h3>
        </React.Fragment>
    )
}
