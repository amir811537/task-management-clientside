// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_API_KEY,
  authDomain: "hotel-booking-auth-e8380.firebaseapp.com",
  projectId: "hotel-booking-auth-e8380",
  storageBucket: "hotel-booking-auth-e8380.appspot.com",
  messagingSenderId: "998643994397",
  appId: "1:998643994397:web:f058c0bebc6f365c92dbf4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;