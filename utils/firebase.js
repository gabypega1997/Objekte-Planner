// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBdhc10ONV1Wf9FtOdm0xT-p27uO-8xsi0",
    authDomain: "objekte-planner.firebaseapp.com",
    projectId: "objekte-planner",
    storageBucket: "objekte-planner.appspot.com",
    messagingSenderId: "792821844705",
    appId: "1:792821844705:web:ad63a5655cc114db2f05a0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

export {db};