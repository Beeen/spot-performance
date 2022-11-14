import { useRef } from 'react';
import firebase from './FirebaseConfig'
import { collection, getFirestore, getDoc, doc, setDoc, addDoc } from "firebase/firestore";


export default class FirebaseService {
    firestore = getFirestore(firebase);

    // usersCollectionRef = collection('users');
    // pagesCollectionRef = collection('pages');

    // Create a root reference
    // storageRef = firebase.storage().ref();
    // pagesPhotosRef = this.storageRef.child('pages');

    // Profiles

    async loadUser(userId) {
        console.log('Firebase: Loading User with ID: ' + userId)
        const userRef = doc(this.firestore, "users", userId);
        const userSnapshot = await getDoc(userRef);
        return userSnapshot 
    }

    async createProfile(nickname, uid) {
        var userRef = doc(this.firestore, "users", uid);
        const ref = await setDoc(userRef, {
            nickname: nickname
        });

        //Ben : I don't know why it returns 'undefined' even when it succeeds, ignoring errors
        return { ref: ref }
    }

    // Bookings

    async createBooking(reference, time, uid) {
        var bookingRef = collection(this.firestore, "bookings");
        //var bookingRef = doc(db, "bookings", time)
        const ref = await addDoc(bookingRef, {
            reference: reference,
            time: time,
            user: uid
        });

        return { ref: ref }
    }

    async editBooking(reference, time, uid) {
        //var bookingRef = collection(this.firestore, "bookings");
        var bookingRef = doc(db, "bookings", time)
        const ref = await setDoc(bookingRef, {
            reference: reference,
        });

        return { ref: ref }
    }

}