// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAE0rUHaWj47rReVan0g7Lsegv9cGGtjC4",
    authDomain: "utbksesat.firebaseapp.com",
    projectId: "utbksesat",
    storageBucket: "utbksesat.appspot.com",
    messagingSenderId: "923142909634",
    appId: "1:923142909634:web:e96bc9d93961f5f0f3155b",
    measurementId: "G-X8NZ0KFJ77"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app, "gs://utbksesat.appspot.com")

