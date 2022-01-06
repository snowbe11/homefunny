import store, { getCollectionSnapshot } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  addDoc,
  orderBy,
} from "firebase/firestore/lite";

export type EventLogType = {
  date: Date;
  log: string;
};

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

export const getEventState = async () => {
  try {
    let list = await getAppStateSnapshot("stateLog");
    if (list) {
      return {
        eventDate: new Date(list.EventDate.seconds * 1000),
        eventName: list.EventName,
      };
    } else {
      return {
        eventDate: new Date("1917-1-1"),
        eventName: "undefined",
      };
    }
  } catch {
    return {
      eventDate: new Date("2021-11-29"),
      eventName: "james",
    };
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
