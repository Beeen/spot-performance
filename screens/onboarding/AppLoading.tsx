import React, { useContext, useEffect, useState } from 'react';
import {
    StyleSheet,
    Image,
    SafeAreaView,
} from 'react-native';

import firebase from '@services/firebase/FirebaseConfig';
import AuthUserContext from '@context/AuthUserContext';
import FirebaseService from '@services/firebase/FirebaseService';

const AppLoading = (props) => {
    const { state, onLoadingFinished, setUserId } = useContext(AuthUserContext);

    checkUserAccount = (authUser) => {

        console.log('AppLoading: ' + authUser.uid)
        setUserId(authUser.uid)

        const firebaseService = new FirebaseService()
        firebaseService.loadUser(authUser.uid)
            .then(({ userSnapshot }) => {
                if (userSnapshot.exists) {
                    console.log('AppLoading: The user has an account')
                    onLoadingFinished()
                }
                else{
                    console.log('AppLoading: The user doesn\'t have an account')
                    props.navigation.navigate('Nickname')
                }
            })
    }

    useEffect(() => {
        // onAuthStateChanged returns an unsubscriber
        // const unsubscribeAuth = firebase.auth().onAuthStateChanged(async authUser => {
        //     try {
        //         // If the user is logged in, will should switch to home with onLoadingFinished()
        //         // Other wise navigate to the login screen

        //         console.log('AuthStateChanged')

        //         await (authUser ? checkUserAccount(authUser) : props.navigation.navigate('Login'));
        //     } catch (error) {
        //         console.log(error);
        //     }
        // });

        // // unsubscribe auth listener on unmount
        // return unsubscribeAuth;

        const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => { // detaching the listener

            console.log('AppLoading: AuthStateChanged')

            if (authUser) {
                // ...your code to handle authenticated users. 
                checkUserAccount(authUser)
            } else {
                // No user is signed in...code to handle unauthenticated users.
                props.navigation.navigate('Login') 
            }
        });
        return () => unsubscribe(); // unsubscribing from the listener when the component is unmounting.
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={require('@assets/logo-green.png')} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: '#2F2F2F'
    },
    logo: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain'
    }
});

export default AppLoading;