import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {

    apiKey: "AIzaSyAP4ameFfS6bp5jb3Yb3h-VeimfmQ_KiSI",
    authDomain: "chat-45584.firebaseapp.com",
    projectId: "chat-45584",
    storageBucket: "chat-45584.appspot.com",
    messagingSenderId: "725706201062",
    appId: "1:725706201062:web:04d35afa1740cef0902827",
    measurementId: "G-CBE6T7C58H"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
