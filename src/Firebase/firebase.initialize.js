import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";

// Initialize Firebase
const initializeFirebaseAuthentication = () => {
    initializeApp( firebaseConfig );
}

export default initializeFirebaseAuthentication;