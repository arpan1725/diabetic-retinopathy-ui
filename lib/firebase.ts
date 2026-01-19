// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAh3fzm1aUSJAa77337kM8iGH5G6NPCPNM",
  authDomain: "retina-infinite.firebaseapp.com",
  projectId: "retina-infinite",
  storageBucket: "retina-infinite.firebasestorage.app",
  messagingSenderId: "970213414021",
  appId: "1:970213414021:web:c6797a2c5abd43df2b85ec",
  measurementId: "G-E9PHKYDLCR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  db = getFirestore(app);