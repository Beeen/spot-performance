import * as firebase from 'firebase';

// Optionally import the services that you want to use
//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCrnwdCE3zinaraYAB8KR7W3Ndor8YaboM",
  authDomain: "yourfeed-ab0c3.firebaseapp.com",
  databaseURL: "https://yourfeed-ab0c3.firebaseio.com",
  projectId: "yourfeed-ab0c3",
  storageBucket: "yourfeed-ab0c3.appspot.com",
  messagingSenderId: "1048859722870",
  appId: "1:1048859722870:web:fd679542c948dd8cce8b57",
  measurementId: "G-H12YSDDNMC"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

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