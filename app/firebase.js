import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaWD5qN2RPVHd6NvTDrBzoO3HXZnDvmao",
  authDomain: "dashboard-428ad.firebaseapp.com",
  projectId: "dashboard-428ad",
  storageBucket: "dashboard-428ad.appspot.com",
  messagingSenderId: "802949823873",
  appId: "1:802949823873:web:1e8b499fbeda6fa26c3c80",
  measurementId: "G-Z8LQ3L0QC1",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


