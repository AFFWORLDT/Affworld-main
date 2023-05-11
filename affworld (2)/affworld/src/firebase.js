// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjFfyANv0iUqDk-NEWYCcGTXjZ5817LEg",
  authDomain: "affworld-dd450.firebaseapp.com",
  databaseURL: "https://affworld-dd450-default-rtdb.firebaseio.com",
  projectId: "affworld-dd450",
  storageBucket: "affworld-dd450.appspot.com",
  messagingSenderId: "72204375102",
  appId: "1:72204375102:web:ee6f2246869225c1b5ad6f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
const analytics = getAnalytics(app);