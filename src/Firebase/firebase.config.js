// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaxMEcJz7RBJ91I8wx3vraibDS3o7K8pA",
  authDomain: "electronics-bazaar-auth.firebaseapp.com",
  projectId: "electronics-bazaar-auth",
  storageBucket: "electronics-bazaar-auth.appspot.com",
  messagingSenderId: "543067499985",
  appId: "1:543067499985:web:b343dc0d879a1232b644f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;