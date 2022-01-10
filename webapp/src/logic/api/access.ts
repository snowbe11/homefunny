import store, { getCollectionSnapshot } from "../firebase";
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

type EventStateType = {
  eventDate: Date,
  eventName: string,
}

type EventLogDocumentType = {
  EventDate: Date,
  EventName: string,
}

const getAppStateSnapshot = (documentName: string) => {
  if (process.env.REACT_APP_COLLECTION_APP_STATE) {
    return getCollectionSnapshot(
      process.env.REACT_APP_COLLECTION_APP_STATE,
      documentName
    );
  } else {
    return undefined;
  }
};

export const getEventState = async () : Promise<EventStateType> => {
  try {
    let eventDateLog = await getEventLogSnapshot();
    if (eventDateLog) {
      const bathLogOnly = eventDateLog.filter((log) => {
        const { type } = splitLogToContents(log.EventLog);
        return (type === "bath") ? true : false;
      });

      for (const log of bathLogOnly) {
        const { text } = splitLogToContents(log.EventLog);
        return {
          eventDate: new Date(log.EventTime.seconds * 1000),
          eventName: text,
        }
      }
    }
  } catch (e) {
    console.log(e);
  }

  return {
    eventDate: new Date("2021-11-29"),
    eventName: "james",
  };
};

export const getTodayEvent = async () : Promise<Array<EventLogType>> => {
  try {
    let eventDateLog = await getEventByDate(new Date(new Date().toDateString()));
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

const getEventLogSnapshot = async () => {
  if (process.env.REACT_APP_COLLECTION_EVENT_LOG) {
    const storeCollection = collection(
      store,
      process.env.REACT_APP_COLLECTION_EVENT_LOG
    );
    const storeQuery = query(storeCollection, orderBy("EventTime", "desc"));
    const storeSnapshot = await getDocs(storeQuery);
    return storeSnapshot.docs.map((doc) => doc.data());
  } else {
    return undefined;
  }
};

const getEventByDate = async (date: Date) => {
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
    return storeSnapshot.docs.map((doc) => doc.data());
  } else {
    return undefined;
  }
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

export const queryDocument = async (eventId: number) => {
  if (process.env.REACT_APP_COLLECTION_NAME) {
    const collectionStore = collection(
      store,
      process.env.REACT_APP_COLLECTION_NAME
    );
    const queried = query(collectionStore, where("eventId", "==", eventId));

    const querySnapshot = await getDocs(queried);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(doc.id, "=>", data);
    });
  }
};


// 이걸 완전히 변경한다
// 일자별로 남긴 로그를 모두 확인할 수 있게 변경할텐데
// DB 에 저장하는 방법이 문제다.
// 우선 로그를 굳이 유니크하게 만들지 않고 차라리 삭제할 수 있게 하는것이 나을 수 있다.

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
