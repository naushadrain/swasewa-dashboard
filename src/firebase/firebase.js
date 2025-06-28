import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Firestore Database
import { getStorage } from "firebase/storage"; // ✅ Firebase Storage

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2vgsfUie1NZwZCFRVd9GpNFcB7mCDAeo",
  authDomain: "swasewa-flutter.firebaseapp.com",
  databaseURL: "https://swasewa-flutter-default-rtdb.firebaseio.com",
  projectId: "swasewa-flutter",
  storageBucket: "swasewa-flutter.appspot.com", // ✅ Corrected storageBucket URL
  messagingSenderId: "103581132524",
  appId: "1:103581132524:web:3a5fa2d93b007c3e96e7c9",
  measurementId: "G-5XLQJF9NMH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Firestore
const storage = getStorage(app); // ✅ Storage

export { auth, db, storage }; // ✅ Ensure All Are Exported
