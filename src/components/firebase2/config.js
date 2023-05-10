// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDawg3GVmE7sUgieKNNvakByaPinaHNsJo",
  authDomain: "coder-31110.firebaseapp.com",
  projectId: "coder-31110",
  storageBucket: "coder-31110.appspot.com",
  messagingSenderId: "865640035001",
  appId: "1:865640035001:web:d55f40f538ede6d236e168"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db=getFirestore(app)