// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from 'firebase/firestore';
// import firebase from 'firebase';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB_r_DkbsQz0QChqDYTivrjyZXBHeceLYc",
  authDomain: "spotafriend-bfbe0.firebaseapp.com",
  projectId: "spotafriend-bfbe0",
  storageBucket: "spotafriend-bfbe0.appspot.com",
  messagingSenderId: "978171594345",
  appId: "1:978171594345:web:cc07e2e3deb40e127484f8",
  measurementId: "G-YNSPGSNJDJ",
  // databaseURL: "https://spotafriend-bfbe0.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// firebase.firestore();
firebase.getFirestore().settings({ experimentalForceLongPolling: true });
 
// export default db;