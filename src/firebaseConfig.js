import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"
const firebaseConfig = {
  apiKey: "AIzaSyCcfztUvfJqZm8r3BRywz-A3VSX8n-5jIo",
  authDomain: "lna-41afb.firebaseapp.com",
  projectId: "lna-41afb",
  databaseURL: "https://lna-41afb-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "lna-41afb.appspot.com",
  messagingSenderId: "211066340973",
  appId: "1:211066340973:web:8bec9ddbcfb25cfd2d6164",
  measurementId: "G-DRF6KMFN52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app