// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHo_Crwl1yVIclXe4r8Bt9EUqAZdWxHN0",
  authDomain: "my-board-app-54dbe.firebaseapp.com",
  projectId: "my-board-app-54dbe",
  storageBucket: "my-board-app-54dbe.appspot.com",
  messagingSenderId: "44261967373",
  appId: "1:44261967373:web:3594a2ba6cf864372a7744",
  measurementId: "G-5GGX9LJ5T0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;
