// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAILRchWQ2q0fuPEsuNyY6WRwSj8Hf0OJ4",
  authDomain: "indus-client.firebaseapp.com",
  projectId: "indus-client",
  storageBucket: "indus-client.appspot.com",
  messagingSenderId: "357714997571",
  appId: "1:357714997571:web:1bacda61fcc4cdcd2fbff6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
