// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "react-blog-b971f.firebaseapp.com",
  projectId: "react-blog-b971f",
  storageBucket: "react-blog-b971f.appspot.com",
  messagingSenderId: "317562883320",
  appId: "1:317562883320:web:c8682b4b9e44b96a3d7f0d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);