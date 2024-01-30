/* eslint-disable no-undef */
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyAugNq0P5Ar5Ri-YNWkCPB4rbMWvk9NF60",
  
    authDomain: "task-management-auth-65fb3.firebaseapp.com",
  
    projectId: "task-management-auth-65fb3",
  
    storageBucket: "task-management-auth-65fb3.appspot.com",
  
    messagingSenderId: "230301408846",
  
    appId: "1:230301408846:web:04f0de4773494449d8ed1f",
  };
  

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});