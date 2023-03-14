// import firebase from "firebase/app";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import {
  getFirestore,
  collection,
  addDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCM17z01qHgmxNN-b7vyOQlBBIGzX5razM",
  authDomain: "tvshows-c6813.firebaseapp.com",
  projectId: "tvshows-c6813",
  storageBucket: "tvshows-c6813.appspot.com",
  messagingSenderId: "88111709738",
  appId: "1:88111709738:web:05703fce0944c65c728d53",
  measurementId: "G-FSHPJXRYWH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export { provider, db, auth };
export default firebase;
