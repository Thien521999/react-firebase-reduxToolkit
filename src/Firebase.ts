// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC2D6wTpYpPYrnUhtSJd9uaRUPZTheq1SQ",
  authDomain: "react-firebase-4e780.firebaseapp.com",
  projectId: "react-firebase-4e780",
  storageBucket: "react-firebase-4e780.appspot.com",
  messagingSenderId: "426718286790",
  appId: "1:426718286790:web:8c93dfdf65f5fc840658c7",
  measurementId: "G-R3468MK19L"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

