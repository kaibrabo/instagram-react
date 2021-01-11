import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
//import "firebase/database";
//import "firebase/functions";
//import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDI1V3yWew3YlvBbkkV-zjH_HiE1-UXyOY",
    authDomain: "instagram-dev-5a51d.firebaseapp.com",
    projectId: "instagram-dev-5a51d",
    storageBucket: "instagram-dev-5a51d.appspot.com",
    messagingSenderId: "963555984774",
    appId: "1:963555984774:web:b68f22c82550acc306d807",
};

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;