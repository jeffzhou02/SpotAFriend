// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyB_r_DkbsQz0QChqDYTivrjyZXBHeceLYc",
//   authDomain: "spotafriend-bfbe0.firebaseapp.com",
//   projectId: "spotafriend-bfbe0",
//   storageBucket: "spotafriend-bfbe0.appspot.com",
//   messagingSenderId: "978171594345",
//   appId: "1:978171594345:web:cc07e2e3deb40e127484f8",
//   measurementId: "G-YNSPGSNJDJ",
//   databaseURL: "https://spotafriend-bfbe0-default-rtdb.firebaseio.com/",
// };

const firebaseConfig = {
  apiKey: "AIzaSyA8HNlMzAnDB-Ksmqv-vp8bDfyL1YcRdhQ",
  authDomain: "spotafriend2-9f278.firebaseapp.com",
  projectId: "spotafriend2-9f278",
  storageBucket: "spotafriend2-9f278.appspot.com",
  messagingSenderId: "929488076000",
  appId: "1:929488076000:web:933d91be7b3cbba5e0a485",
  measurementId: "G-5PBDMR7HNG",
  databaseURL: "https://spotafriend2-9f278-default-rtdb.firebaseio.com/",
};

//Get a reference to the storage service, which is used to create references in your storage bucket

// Create a storage reference from our storage service

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const db = getDatabase();
