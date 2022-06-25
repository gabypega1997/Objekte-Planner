import firebase from "firebase/app";
import "firebase/firestore";

const  config :any = {
    apiKey: "AIzaSyCjVIRuq-QkS56GhBLCfXNafAEnXMUeGsg",
    authDomain: "gabriel-pescar--nextjs.firebaseapp.com",
    projectId: "gabriel-pescar--nextjs",
    storageBucket: "gabriel-pescar--nextjs.appspot.com",
    messagingSenderId: "610264300570",
    appId: "1:610264300570:web:18986c84b0b81ddc88a5a3",
    measurementId: "G-WYR48QFVH2"
    };

if(!firebase.getApps.length){
    firebase.initializeApp(config);
}

const firestore = firebase.firestore();

export { firestore };