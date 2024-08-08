// import { initializeApp } from "firebase/app";
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCcfztUvfJqZm8r3BRywz-A3VSX8n-5jIo",
  authDomain: "lna-41afb.firebaseapp.com",
  projectId: "lna-41afb",
  storageBucket: "lna-41afb.appspot.com",
  messagingSenderId: "211066340973",
  appId: "1:211066340973:web:8bec9ddbcfb25cfd2d6164",
  measurementId: "G-DRF6KMFN52"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app