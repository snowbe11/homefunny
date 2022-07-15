import store from "@snowbe11/easy-firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore/lite";

export type EventLogType = {
  loggingTime: Date;
  eventType: string;
  eventTime: Date;
  eventUser: string;
  logText: string;
  repeat: Array<string>;
};

type EventLogCollection = {
  LoggingTime: Timestamp;
  EventType: string;
  EventTime: Timestamp;
  EventLog: string;
  EventUser: string;
  Repeat: Array<string>;
};

export type BathEventType = {
  date: Date;
  name: string;
};

const getEventLogSnapshot = async (): Promise<
  Array<EventLogCollection> | undefined
> => {
  if (process.env.REACT_APP_COLLECTION_EVENT_LOG) {
    const storeCollection = collection(
      store,
      process.env.REACT_APP_COLLECTION_EVENT_LOG
    );
    const storeQuery = query(storeCollection, orderBy("EventTime", "desc"));
    const storeSnapshot = await getDocs(storeQuery);
    return storeSnapshot.docs.map((doc) => doc.data() as EventLogCollection);
  } else {
    return undefined;
  }
};

const getEventByDate = async (
  date: Date
): Promise<Array<EventLogCollection> | undefined> => {
  if (process.env.REACT_APP_COLLECTION_EVENT_LOG) {
    const storeCollection = collection(
      store,
      process.env.REACT_APP_COLLECTION_EVENT_LOG
    );

    // 반복 스케줄 쿼리
    const week = ["sun", "mon", "tue", "wed", "thr", "fri", "sat"];
    const thisweek = week[date.getDay()];

    const repeatQuery = query(
      storeCollection,
      where("Repeat", "array-contains", thisweek)
    );
    const snapshotByRepeat = await getDocs(repeatQuery);

    const logCollection2 = snapshotByRepeat.docs.map((doc) => {
      let eventLog = doc.data() as EventLogCollection;

      // repeat 이기 때문에 오늘 날자로 치환
      const now = new Date();
      const eventDate = new Date(eventLog.EventTime.seconds * 1000);
      now.setHours(eventDate.getHours());
      now.setMinutes(eventDate.getMinutes());
      now.setSeconds(eventDate.getSeconds());

      eventLog.EventTime = Timestamp.fromDate(now);

      return eventLog;
    });

    // 지정일 스케줄
    const timefrom = Timestamp.fromDate(date);
    date.setDate(date.getDate() + 1);
    const timeto = Timestamp.fromDate(date);
    const pickDateQuery = query(
      storeCollection,
      where("EventTime", ">=", timefrom),
      where("EventTime", "<=", timeto)
    );
    const snapshotByDate = await getDocs(pickDateQuery);

    // 쿼리에서 빼면 더 좋다.
    // 쿼리 조건을 작성할 수 없어 일단 코드에서 처리한다.
    const logFilterCollection = snapshotByDate.docs.filter((doc) => {
      const eventLog = doc.data() as EventLogCollection;

      if (!eventLog.Repeat || eventLog.Repeat.length === 0) {
        return true;
      } else {
        return false;
      }
    });

    const logCollection1 = logFilterCollection.map(
      (doc) => doc.data() as EventLogCollection
    );

    return [...logCollection1, ...logCollection2];
  } else {
    return undefined;
  }
};

export const getRecentBathEvent = async (): Promise<BathEventType> => {
  try {
    const eventDateLog = await getEventLogSnapshot();
    if (eventDateLog) {
      const bathLogOnly = eventDateLog.filter((log) => {
        const { eventType } = parseLegacyEventLog(log);
        return eventType === "bath" ? true : false;
      });

      for (const log of bathLogOnly) {
        const { eventUser } = parseLegacyEventLog(log);
        return {
          date: new Date(log.EventTime.seconds * 1000),
          name: eventUser,
        };
      }
    }
  } catch (e) {
    console.log(e);
  }

  return {
    date: new Date("2021-11-29"),
    name: "james",
  };
};

export const getTodayEvent = async (): Promise<Array<EventLogType>> => {
  return getEventAt(new Date());
};

export const getEventAt = async (date: Date): Promise<Array<EventLogType>> => {
  try {
    let eventDateLog = await getEventByDate(new Date(date.toDateString()));
    if (eventDateLog) {
      return eventDateLog.map((log) => {
        return parseLegacyEventLog(log);
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
        return parseLegacyEventLog(log);
      });

      return convertedDataform;
    } else {
      return [];
    }
  } catch {
    return [];
  }
};

export const addEvent = async (
  eventLog: EventLogType
): Promise<EventLogType | undefined> => {
  if (process.env.REACT_APP_COLLECTION_EVENT_LOG) {
    const collectionRef = collection(
      store,
      process.env.REACT_APP_COLLECTION_EVENT_LOG
    );
    await addDoc(collectionRef, {
      LoggingTime: Timestamp.fromDate(eventLog.loggingTime),
      EventType: eventLog.eventType,
      EventTime: Timestamp.fromDate(eventLog.eventTime),
      EventUser: eventLog.eventUser,
      EventLog: eventLog.logText,
      Repeat: eventLog.repeat,
    });
  }

  return eventLog;
};

export type EventType = "bath" | "custom" | "ban" | "repeat";

export const splitLogToContents = (log: string): EventLogType => {
  const token = log.split("|");

  if (token.length < 5) {
    return {
      loggingTime: new Date(token[3]),
      eventTime: new Date(token[3]),
      eventUser: token[0] as "james" | "henry",
      eventType: token[1] as EventType,
      logText: token[2],
      repeat: [],
    };
  } else {
    return {
      loggingTime: new Date(token[3]),
      eventTime: new Date(token[3]),
      eventUser: token[0] as "james" | "henry",
      eventType: token[1] as EventType,
      logText: token[2],
      repeat: token[4].split(""),
    };
  }
};

export const parseLegacyEventLog = (log: EventLogCollection) => {
  if (!log.EventUser || log.EventUser.length === 0) {
    return splitLogToContents(log.EventLog);
  } else {
    return {
      loggingTime: new Date(log.LoggingTime.seconds * 1000),
      eventType: log.EventType,
      eventTime: new Date(log.EventTime.seconds * 1000),
      eventUser: log.EventUser,
      logText: log.EventLog,
      repeat: log.Repeat,
    };
  }
};
