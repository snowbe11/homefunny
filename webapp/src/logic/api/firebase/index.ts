import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  getDocs,
  setDoc,
  deleteDoc,
} from "firebase/firestore/lite";
//const analytics = getAnalytics(firebaseApp);
//import { getAnalytics } from "firebase/analytics";

export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);

export const getCollectionSnapshot = async (
  collectionName: string,
  documentName: string
) => {
  const document = doc(firestore, collectionName, documentName);

  const snapshot = await getDoc(document);
  if (snapshot.exists()) {
    return snapshot.data();
  }
};

export const getCollection = async (collectionName: string) => {
  try {
    const storeCollection = collection(firestore, collectionName);

    const snapshots = await getDocs(storeCollection);

    const list = Array<string>();
    snapshots.forEach((e) => list.push(e.id));

    return list;
  } catch {
    return Array<string>();
  }
};

export type FirebaseValueObject = {
  [index: string]: any;
};

export const getDocument = async <T extends FirebaseValueObject>(
  collectionName: string,
  documentName: string
): Promise<T | undefined> => {
  try {
    let documentData = await getCollectionSnapshot(
      collectionName,
      documentName
    );
    if (documentData) {
      let result: FirebaseValueObject = {};

      for (const key of Object.keys(documentData)) {
        result[key] = documentData[key];
      }

      return result as T;
    }
  } catch (e) {
    console.log("firebase", e);
  }
};

export const addDocument = async <T extends FirebaseValueObject>(
  collectionName: string,
  documentName: string,
  values: T
) => {
  try {
    const document = doc(firestore, collectionName, documentName);

    const documentData = Object.keys(values).reduce<FirebaseValueObject>(
      (result, key) => {
        result[key] = values[key];
        return result;
      },
      {}
    );

    await setDoc(document, documentData);

    return true;
  } catch (e) {
    console.log("firebase", e);
  }

  return false;
};

export const deleteDocument = async (
  collectionName: string,
  documentName: string
) => {
  try {
    const document = doc(firestore, collectionName, documentName);

    await deleteDoc(document);

    return true;
  } catch (e) {
    console.log("firebase", e);
  }

  return false;
};

export default firestore;
