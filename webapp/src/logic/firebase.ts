// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//const analytics = getAnalytics(firebaseApp);

import { getFirestore, doc, getDoc } from "firebase/firestore/lite";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const store = getFirestore(firebaseApp);

export const getCollectionSnapshot = async (
  collection: string,
  documentName: string
) => {
  const docRef = doc(store, collection, documentName);
  const docSnapshot = await getDoc(docRef);
  if (docSnapshot.exists()) {
    return docSnapshot.data();
  }
};

// export const getCollectionSnapshot = async (collectionName: string) => {
//   const storeCollection = collection(store, collectionName);
//   const storeSnapshot = await getDocs(storeCollection);
//   return storeSnapshot.docs.map((doc) => doc.data());
// };

export default store;
