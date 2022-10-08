// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAbd9zSbg8PPG0bUVz_JGoSHSAi39oSk9s",
    authDomain: "share-information-3301d.firebaseapp.com",
    databaseURL: "https://share-information-3301d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "share-information-3301d",
    storageBucket: "share-information-3301d.appspot.com",
    messagingSenderId: "197751535480",
    appId: "1:197751535480:web:070ad19dea86850544ba8d",
    measurementId: "G-P94S3DJ48D"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const getRef = (isDB = false, URI) => {
    return isDB ? ref(db) : ref(db, URI);
};

const analytics = getAnalytics(app);

export default getRef; // export the function

