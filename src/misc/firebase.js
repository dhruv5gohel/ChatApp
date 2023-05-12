import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const config = {
    apiKey: "AIzaSyAtHnV9n1uJ4TREG8GMI24EavhCkKMLiiU",
    authDomain: "chatapp-11c8d.firebaseapp.com",
    projectId: "chatapp-11c8d",
    storageBucket: "chatapp-11c8d.appspot.com",
    messagingSenderId: "712914050702",
    appId: "1:712914050702:web:326ba26d42df0062cc33df"
};

const app = initializeApp(config);
export const auth = getAuth(app);
export const database = getDatabase()