// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAugNq0P5Ar5Ri-YNWkCPB4rbMWvk9NF60",

  authDomain: "task-management-auth-65fb3.firebaseapp.com",

  projectId: "task-management-auth-65fb3",

  storageBucket: "task-management-auth-65fb3.appspot.com",

  messagingSenderId: "230301408846",

  appId: "1:230301408846:web:04f0de4773494449d8ed1f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
