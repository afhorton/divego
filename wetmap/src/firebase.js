// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEzTIXHlKK8eM2Qk_4vo0ygZUgni6zMfY",
  authDomain: "divego-ae74c.firebaseapp.com",
  projectId: "divego-ae74c",
  storageBucket: "divego-ae74c.appspot.com",
  messagingSenderId: "363153772728",
  appId: "1:363153772728:web:06db78d35b3c036b03644d",
  measurementId: "G-E6S75886TJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);