import firebase from 'firebase';
import initializeApp from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD8P0VH32-3ROCRIHxddrgmVU_IytN0iug",
    authDomain: "react-native-food-delive-5ebc0.firebaseapp.com",
    projectId: "react-native-food-delive-5ebc0",
    storageBucket: "react-native-food-delive-5ebc0.appspot.com",
    messagingSenderId: "1038128394800",
    appId: "1:1038128394800:web:337ca5fa1de3c7d407f3f5"
  };

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;