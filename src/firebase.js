import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwwKU6QOOAxWzNClvb3flWeD7eu_nfZgY",
  authDomain: "chat-app-71e37.firebaseapp.com",
  projectId: "chat-app-71e37",
  storageBucket: "chat-app-71e37.appspot.com",
  messagingSenderId: "932964313629",
  appId: "1:932964313629:web:ab00c94c4f4e031f3534f4",
  measurementId: "G-J1XBT5EC4R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
