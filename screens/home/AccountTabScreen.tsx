import { AuthUserContextType, RootTabScreenProps } from "types";
import { Text, View } from '../../components/Themed';
import { StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useDebugValue, useEffect, useState }  from "react";
import { getAuth, signOut } from "firebase/auth";
import {AuthUserContext} from '@context/AuthUserContext';

export default function AccountTabScreen({ navigation }: RootTabScreenProps<'BookTab'>) {
    const {onSignOut} = useContext(AuthUserContext) as AuthUserContextType;

    const logOut = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Logged out");
            onSignOut()
        }).catch((error) => {
            // An error happened.
        });
    };

    const deleteAccount = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("Logged out");
            onSignOut()
        }).catch((error) => {
            // An error happened.
        });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={logOut}>
            <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={deleteAccount}>
            <Text style={styles.buttonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white'
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    button: {
        backgroundColor: 'white',
        width: '80%',
        height: 50,
        padding: 10,
        borderRadius: 10,
        margin: 20,
        justifyContent: 'center'
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
    },
  });