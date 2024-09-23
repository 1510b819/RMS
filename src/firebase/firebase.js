// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAyISKclXIlruWy_a6ScVQOZP72MXk9x0M",
  authDomain: "rpmauth-1e30e.firebaseapp.com",
  projectId: "rpmauth-1e30e",
  storageBucket: "rpmauth-1e30e.appspot.com",
  messagingSenderId: "658715764261",
  appId: "1:658715764261:web:8bd9868d2d36bebe95c1cc",
  databaseURL: "https://rpmauth-1e30e-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app); 
const storage = getStorage(app);
const database = getDatabase(app);

export { app, auth, firestore, storage, database };
