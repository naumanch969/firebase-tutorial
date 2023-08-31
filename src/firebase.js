import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "fir-tutorial-8d140.firebaseapp.com",
    projectId: "fir-tutorial-8d140",
    storageBucket: "fir-tutorial-8d140.appspot.com",
    messagingSenderId: "503459269832",
    appId: "1:503459269832:web:46a04d1c9289f92d6569fd"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth()
export const storage = getStorage()