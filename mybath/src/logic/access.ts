import firebaseApp from "./firebase";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  orderBy,
} from "firebase/firestore/lite";

const store = getFirestore(firebaseApp);
let eventLogIndex = 0;

const getAppStateSnapshot = async (documentName: string) => {
  if (process.env.REACT_APP_COLLECTION_APP_STATE) {
    const docRef = doc(
      store,
      process.env.REACT_APP_COLLECTION_APP_STATE,
      documentName
    );
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      return docSnapshot.data();
    }
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
    //const storeSnapshot = await getDocs(storeCollection);
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
  
      eventLogIndex = convertedDataform.length + 1;
      return convertedDataform;
    } else {
      return [];
    }
  }
  catch {
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
  }
  catch {
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

// class EventLog {
//   date: Date;
//   log: string;

//   constructor(date: Date, log: string) {
//     this.date = date;
//     this.log = log;
//   }
// }

// const EventLogSerializer = {
//     toFirebase: (eventLog : EventLog) => {
//         return {
//             date: eventLog.date,
//             log: eventLog.log,
//         }
//     },
//     fromFirebase: (snapshot: DocumentData, options: any) => {
//         const data = snapshot.data(options);
//         return new EventLog(data.date, data.log);
//     }
// };

export const addEvent = async (currentDate: Date, userName: string) => {
  if (process.env.REACT_APP_COLLECTION_APP_STATE) {
    const stateLogDocRef = doc(
      store,
      process.env.REACT_APP_COLLECTION_APP_STATE,
      "stateLog"
    );
    await setDoc(stateLogDocRef, {
      EventDate: currentDate,
      EventName: userName,
    });

    if (process.env.REACT_APP_COLLECTION_EVENT_LOG) {
      const eventLogDocRef = doc(
        store,
        process.env.REACT_APP_COLLECTION_EVENT_LOG,
        `event${eventLogIndex}`
      );
      await setDoc(eventLogDocRef, {
        EventTime: currentDate,
        EventLog: `set ${userName}`,
      });
    }

    return { date: currentDate, name: userName };
  } else {
    return undefined;
  }
};
