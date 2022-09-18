import { useRef } from 'react';
import firebase from './FirebaseConfig'


export default class FirebaseService {
    auth = firebase.auth()
    firestore = firebase.firestore()

    usersCollectionRef = this.firestore.collection('users');
    pagesCollectionRef = this.firestore.collection('pages');

    // Create a root reference
    storageRef = firebase.storage().ref();
    pagesPhotosRef = this.storageRef.child('pages');

    async loadUser(userId) {
        try {
            var userRef = this.usersCollectionRef.doc(userId);

            const userSnapshot = await userRef.get()
            return { userSnapshot: userSnapshot }

        } catch (error) {
            return { error }
        }
    }

    async createProfile(nickname, uid) {

        try {

            var userRef = this.usersCollectionRef.doc(uid);

            const ref = await userRef.set({
                nickname: nickname
            }).then(console.log);

            //Ben : I don't know why it returns 'undefined' even when it succeeds, ignoring errors
            return { ref: ref }

        } catch (error) {
            return { error }
        }
    }

    async createPage(userID, name, profilePic, coverPic) {

        try {

            // Create page document
            var pagesRef = this.pagesCollectionRef;
            const newRef = await pagesRef.add({
                name: name,
                city: 'Toulouse',
                owners: [`${userID}`]
            })
            const pageID = newRef.id;
            console.log('Page document added: ' + pageID);

            // Upload profile and cover pictures
            const profilePicURL = await this.uploadImage(pageID, profilePic, 'profile.jpg')
            console.log('Profile picture uploaded');
            const coverPicURL = await this.uploadImage(pageID, coverPic, 'cover.jpg')
            console.log('Cover picture uploaded');

            // Add links to page document
            var createdPageRef = this.pagesCollectionRef.doc(pageID);
            const ref = await createdPageRef.set({
                profilePic: profilePicURL,
                coverPic: coverPicURL
            }, { merge: true })
            console.log('Pictures links added to page');

            // Ben: This is now useless as we do not need to link the pages because we query the "pages" collection by "owners"
            // var pageLinkRef = this.usersCollectionRef.doc(userID).collection('pages').doc(pageID);
            // const result = await pageLinkRef.set({
            //     role: 'creator'
            // })
            // console.log('Page linked to user profile');

            return { ref: ref }

        } catch (error) {
            console.log(error)
            return { error }
        }
    }

    async loadManagedPages(userId) {
        const snapshot = await firebase.firestore().collection('users').doc(userId).collection('pages').get()
        const linkedPagesId = snapshot.docs.map(doc => doc.id);
        console.log('Retrieved linked pages: ' + linkedPagesId.length)
        return linkedPagesId
    }

    async loadPages() {
        const retrievedPagesSnapshot = await firebase.firestore().collection('pages').get()
        const pages = retrievedPagesSnapshot.docs.map(doc => doc.data());
        console.log('Retrieved pages: ' + pages)
        return pages
    }

    async loadPage(pageID) {
        try {
            var pageRef = this.pagesCollectionRef.doc(pageID);

            const pageSnapshot = await pageRef.get()

            if (pageSnapshot.exists) {
                console.log('Retrieved page: ' + pageSnapshot.id)
                //const pageDocument = pageSnapshot.data()
                return pageSnapshot.data()
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                return undefined
            }
        } catch (error) {
            return { error }
        }
    }

    async followPage(userID, pageID) {
        try {

            var followedPageRef = this.usersCollectionRef.doc(userID).collection('following').doc(pageID);

            const ref = await followedPageRef.set({
                added: firebase.firestore.FieldValue.serverTimestamp() 
            })

            //Ben : I don't know why it returns 'undefined' even when it succeeds, ignoring errors
            return { ref: ref }

        } catch (error) {
            return { error }
        }
    }

    async unfollowPage(userID, pageID) {
        try {

            var followedPageRef = this.usersCollectionRef.doc(userID).collection('following').doc(pageID);

            const ref = await followedPageRef.delete()

            //Ben : I don't know why it returns 'undefined' even when it succeeds, ignoring errors
            return { ref: ref }

        } catch (error) {
            return { error }
        }
    }

    async uploadImage(pageID, imageURI, fileName) {

        try {
            const adaptedProfilePicURI = Platform.OS === 'ios' ? imageURI.replace('file://', '') : imageURI;
            console.log('Cleaned URI: ' + adaptedProfilePicURI)

            // Getting the image
            const response = await fetch(adaptedProfilePicURI)
            const imageBlob = await response.blob()
            var imageRef = this.pagesPhotosRef.child(pageID + '/' + fileName)

            console.log('ImageRef: ' + imageRef)
            // Settings metadata
            var metadata = {
                contentType: 'image/jpeg',
            };

            // Create task
            const uploadTask = await imageRef.put(imageBlob, metadata);
            const downloadURL = await uploadTask.ref.getDownloadURL()
            console.log('File available at', downloadURL);
            return downloadURL;

        } catch (error) {
            console.log("ERR ===", error);
            alert("Image uploading failed!");
        }
    };
}