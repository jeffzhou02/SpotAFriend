// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

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
  databaseURL: "https://spotafriend-bfbe0-default-rtdb.firebaseio.com/"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase();