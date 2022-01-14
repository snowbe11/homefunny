import store from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore/lite";
import { splitLogToContents } from "./misc";

export type EventLogType = {
  date: Date;
  log: string;
};

export const InitialEventLog : EventLogType = {
  date: new Date(),
  log: "",
}

type EventLogCollection = {
  EventTime: Timestamp,
  EventLog: string,
}

const getEventLogSnapshot = async () : Promise<Array<EventLogCollection> | undefined> => {
  if (process.env.REACT_APP_COLLECTION_EVENT_LOG) {
    const storeCollection = collection(
      store,
      process.env.REACT_APP_COLLECTION_EVENT_LOG
    );
    const storeQuery = query(storeCollection, orderBy("EventTime", "desc"));
    const storeSnapshot = await getDocs(storeQuery);
    return storeSnapshot.docs.map((doc) => doc.data()  as EventLogCollection);
  } else {
    return undefined;
  }
};

const getEventByDate = async (date: Date) : Promise<Array<EventLogCollection> | undefined> => {
  if (process.env.REACT_APP_COLLECTION_EVENT_LOG) {
    const storeCollection = collection(
      store,
      process.env.REACT_APP_COLLECTION_EVENT_LOG
    );

    const timefrom = Timestamp.fromDate(date);
    date.setDate(date.getDate() + 1);
    const timeto =  Timestamp.fromDate(date);
    let storeQuery = query(storeCollection, where("EventTime", ">=", timefrom), where("EventTime", "<=", timeto));

    const storeSnapshot = await getDocs(storeQuery);
    return storeSnapshot.docs.map((doc) => doc.data() as EventLogCollection);
  } else {
    return undefined;
  }
};

export const getRecentBathEvent = async () : Promise<EventLogType> => {
  try {
    const eventDateLog = await getEventLogSnapshot();
    if (eventDateLog) {
      const bathLogOnly = eventDateLog.filter((log) => {
        const { type } = splitLogToContents(log.EventLog);
        return (type === "bath") ? true : false;
      });

      for (const log of bathLogOnly) {
        const { text } = splitLogToContents(log.EventLog);
        return {
          date: new Date(log.EventTime.seconds * 1000),
          log: text,
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  return {
    date: new Date("2021-11-29"),
    log: "james",
  };
};

export const getTodayEvent = async () : Promise<Array<EventLogType>> => {
  return getEventAt(new Date());
};

export const getEventAt = async (date: Date) : Promise<Array<EventLogType>> => {
  try {
    let eventDateLog = await getEventByDate(new Date(date.toDateString()));
    if (eventDateLog) {
      return eventDateLog.map(log => {
        return {
          date: new Date(log.EventTime.seconds * 1000),
          log: log.EventLog,
        }
      });
    }
  } catch (e) {
    console.log(e);
  }

  return [];
};

export const getEventLog = async () => {
  try {
    let eventDateLog = await getEventLogSnapshot();
    if (eventDateLog) {
      const convertedDataform = eventDateLog.map((log) => {
        return {
          date: new Date(log.EventTime.seconds * 1000),
          text: log.EventLog,
        };
      });

      return convertedDataform;
    } else {
      return [];
    }
  } catch {
    return [];
  }
};

export const addEvent = async (currentDate: Date, log: string) : Promise<EventLogType | undefined> => {
  if (process.env.REACT_APP_COLLECTION_EVENT_LOG) {
    const collectionRef = collection(
      store,
      process.env.REACT_APP_COLLECTION_EVENT_LOG
    );
    await addDoc(collectionRef, {
      EventTime: currentDate,
      EventLog: log,
    });
  }

  return { date: currentDate, log: log };
};
