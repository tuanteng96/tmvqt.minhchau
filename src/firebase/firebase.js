import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBld9IZYa48FYLrIXD5V6PZoYAH_A3r8XQ",
    authDomain: "thammyvienminhchau-2cee0.firebaseapp.com",
    projectId: "thammyvienminhchau-2cee0",
    storageBucket: "thammyvienminhchau-2cee0.appspot.com",
    messagingSenderId: "843268583249",
    appId: "1:843268583249:web:267c9c68d3d19eb36bed70",
    measurementId: "G-HMW427E6Q1"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);
export { auth, database };