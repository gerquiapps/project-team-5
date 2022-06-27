// firebase.js

import * as firebase from 'firebase/app';
import { getFirestore } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXr4-nIRGYj4_Xr4lPcL5nV9204SAvG3o",
  authDomain: "project-5912398450612195027.firebaseapp.com",
  projectId: "project-5912398450612195027",
  storageBucket: "project-5912398450612195027.appspot.com",
  messagingSenderId: "710177888876",
  appId: "1:710177888876:web:ceca4b9a6f6b46d1021649",
  measurementId: "G-0S0DM4GY03"
};

export const app = firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
if (process.env.NODE_ENV !== 'production') {
  //const analytics = getAnalytics(app);
}

export default firebase;
