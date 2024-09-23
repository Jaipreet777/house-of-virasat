// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { getFirestore } from "firebase/firestore"; // Import Firestore (for products)
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQAWCTn1VaodvnKuHo7WqmA1V9Yah_T7A",
  authDomain: "house-of-virasat.firebaseapp.com",
  projectId: "house-of-virasat",
  storageBucket: "house-of-virasat.appspot.com",
  messagingSenderId: "333012143010",
  appId: "1:333012143010:web:8371c43bee05d17c5940fb",
  measurementId: "G-7FR2BQ0VM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app); // Initialize Firebase Authentication
const db = getFirestore(app); // Initialize Firestore for product data

// Export the Firebase services
export { auth, db };