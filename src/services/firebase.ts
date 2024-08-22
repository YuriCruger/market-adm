import { initializeApp } from "firebase/app";
import {
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpY8R7lVfQPt3p6zl-K0yT2JND9A2GhUE",
  authDomain: "market-adm-3e0c2.firebaseapp.com",
  projectId: "market-adm-3e0c2",
  storageBucket: "market-adm-3e0c2.appspot.com",
  messagingSenderId: "966546363713",
  appId: "1:966546363713:web:d4b8dd83a1c4436afbfdc0",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
