importScripts('https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyD0Psx7X8J4XhRXAxEnk53G602LT6cVWpw",
  authDomain: "msg-team-2-donation-management.firebaseapp.com",
  projectId: "msg-team-2-donation-management",
  storageBucket: "msg-team-2-donation-management.appspot.com",
  messagingSenderId: "1065061083627",
  appId: "1:1065061083627:web:49488dc705b1e84c8cd1ae",
  measurementId: "G-6SRXVHBJG3"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
