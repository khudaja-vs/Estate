// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-dfe5e.firebaseapp.com",
  projectId: "mern-estate-dfe5e",
  storageBucket: "mern-estate-dfe5e.firebasestorage.app",
  messagingSenderId: "502649526200",
  appId: "1:502649526200:web:841ea2b6c3dcf2d5e3e14d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);