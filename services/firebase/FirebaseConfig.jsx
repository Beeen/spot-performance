import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4V3yo0u9vJZMeyqEQKpplPBYIV5u40pU",
  authDomain: "spotperformance-5602a.firebaseapp.com",
  projectId: "spotperformance-5602a",
  storageBucket: "spotperformance-5602a.appspot.com",
  messagingSenderId: "94051025480",
  appId: "1:94051025480:web:94b3a7f5760a858774ce7d",
  measurementId: "G-STP4Q27Q1W"
};

export default firebase = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
//export const auth = getAuth(firebase);


/*

--- USE WHEN WE WANT TO CALL FIREBASE ---

// FIREBASE
import * as firebase from 'firebase'
import 'firebase/firestore';
import firebaseConfig from '../firebase/FirebaseConfig'

const dbh = firebase.firestore();

  var docRef = dbh.collection("posts").doc("Z0rxg2OBtUBNUONOyxGN");

  docRef.get().then(function(doc) {
      if (doc.exists) {
          console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  }).catch(function(error) {
      console.log("Error getting document:", error);
  });

*/