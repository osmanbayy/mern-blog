// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,        //import.meta.env = process.env (vite'de bu oluyor)
  authDomain: "mern-blog-2fc77.firebaseapp.com",
  projectId: "mern-blog-2fc77",
  storageBucket: "mern-blog-2fc77.appspot.com",
  messagingSenderId: "911692770843",
  appId: "1:911692770843:web:3ecf0e71837d04234252be"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);