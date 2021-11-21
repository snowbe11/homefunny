// Import the functions you need from the SDKs you need
import { initializeApp, } from "firebase/app";
import { Firestore, getFirestore, collection, getDocs } from "firebase/firestore/lite";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const db = getFirestore(firebaseApp);

export default firebaseApp;

export const getBath = async () => {
    console.log(JSON.stringify(firebaseConfig));

    const bathCollection = collection(db, 'bath');
    const basthSnapshot = await getDocs(bathCollection);
    const contextList = basthSnapshot.docs.map(doc => doc.data());
    return contextList;
};