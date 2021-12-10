import store, { getCollectionSnapshot } from "../firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore/lite";
import { WordTestType } from "logic/type";

export const getTestLevelList = async () => {
  try {
    if (process.env.REACT_APP_COLLECTION_WORD_TEST) {
      const storeCollection = collection(
        store,
        process.env.REACT_APP_COLLECTION_WORD_TEST
      );

      const storeSnapshot = await getDocs(storeCollection);

      let list = Array<string>();
      storeSnapshot.forEach((e) => list.push(e.id));

      return list;
    } else {
      return Array<string>();
    }
  } catch {
    return Array<string>("DSX");
  }
};

const getWordTestSnapshot = async (level: string) => {
  if (process.env.REACT_APP_COLLECTION_WORD_TEST) {
    return getCollectionSnapshot(
      process.env.REACT_APP_COLLECTION_WORD_TEST,
      level
    );
  } else {
    return undefined;
  }
};

export const getWordTest = async (level: string) => {
  try {
    let testObject = await getWordTestSnapshot(level);
    if (testObject) {
      let test = Array<WordTestType>();
      for (const key of Object.keys(testObject)) {
        test.push({ word: key, desc: testObject[key] });
      }
    }
    return test;
  } catch {
    return Array<WordTestType>();
  }
};

export const addWordTest = async (level: string, list: Array<WordTestType>) => {
  try {
    if (process.env.REACT_APP_COLLECTION_WORD_TEST) {
      const stateLogDocRef = doc(
        store,
        process.env.REACT_APP_COLLECTION_WORD_TEST,
        level
      );

      let docData = {};
      list.map((e) => {
        docData = { ...docData, [e.word]: e.desc };
        return e;
      });

      await setDoc(stateLogDocRef, docData);
    }

    return true;
  } catch {}

  return false;
};
