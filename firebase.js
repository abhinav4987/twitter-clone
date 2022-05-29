import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyASAGXjNAvqh_Jo9nC9yFyo0trs2M3sq0o",
  authDomain: "twitter-clone-f3c49.firebaseapp.com",
  projectId: "twitter-clone-f3c49",
  storageBucket: "twitter-clone-f3c49.appspot.com",
  messagingSenderId: "1023429896882",
  appId: "1:1023429896882:web:78fc7186587bb1ee7237ab",
  measurementId: "G-RE0Q62R2TS"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };