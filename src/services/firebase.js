import { initializeApp, getApp } from "firebase/app";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator} from "firebase/functions";

export const firebaseConfig = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId,
    measurementId: process.env.REACT_APP_measurementId
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getDatabase(app);

export const auth = getAuth(app);

if( window.location.hostname === "127.0.0.1" ) {
    connectDatabaseEmulator(db, "localhost", 9000);
    const functions = getFunctions(getApp());
    connectFunctionsEmulator(functions, "localhost", 5001);
    connectAuthEmulator(auth, "http://localhost:9099");
}

