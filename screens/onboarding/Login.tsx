import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import firebase from '@services/firebase/FirebaseConfig'
import Constants from 'expo-constants';
import FirebaseService from '@services/firebase/FirebaseService';
import { LogBox } from 'react-native';
//import AuthUserContext from '@context/AuthUserContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useContext } from 'react';
import { OnboardingStackScreenProps } from 'types';
import { useState } from 'react';
import { getAuth, signInAnonymously, User } from "firebase/auth";

export default function Login({ navigation }: OnboardingStackScreenProps<'Login'>) {

    const [uid, setUid] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const signInAnynomously = () => {
        const auth = getAuth(firebase)
        signInAnonymously(auth)
        .then(() => {
            // Signed in..
            //onLoginSuccess()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
            onLoginFailure(errorMessage)
        });
    }

    const onLoginSuccess = (authUser: User): void => {

        // TODO: Check if the profile exist in database
        console.log('onLoginSuccess: ' + authUser.uid)
        //this.state.setUserId(authUser.uid)
        setUid(authUser.uid)

        const firebaseService = new FirebaseService()
        firebaseService.loadUser(authUser.uid)
            .then(userSnapshot => {
                if (userSnapshot.exists()) {
                    console.log('onLoginSuccess: The user has an account')
                    //this.context.onLoadingFinished()
                }
                else{
                    console.log('onLoginSuccess: The user doesn\'t have an account')
                    navigation.navigate('SignupNickname')
                }
            })
        
    }

    const onLoginFailure = (errorMessage: string) => {
        setLoading(false)
        setErrorMessage(errorMessage)
    }

    const renderLoading = () => {
        if (loading) {
            return (
                <View>
                    <ActivityIndicator size={'large'} />
                </View>
            );
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <View style={styles.topContainer}>
                        <Image style={styles.logo} source={require('@assets/logo.png')} />
                        <Text style={styles.header}>
                            Spot Performance
                        </Text>
                        <Text style={styles.subtitle}>
                            Make it yours
                        </Text>
                    </View>
                    {renderLoading()}
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity style={styles.facebookButtonBackground} onPress={() => signInAnynomously()}>
                            <Text style={styles.facebookButtonText}>
                                Sign-in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: '#2F2F2F'
    },
    header: {
        fontSize: 32,
        fontWeight: "700",
        color: "#A1C332",
    },
    subtitle: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "700",
        color: "#A1C332",
    },
    logo: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain'
    },
    topContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    facebookButtonBackground: {
        backgroundColor: "#3A559F",
        height: 50,
        width: '80%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    facebookButtonText: {
        letterSpacing: 0.5,
        fontSize: 16,
        color: "#FFFFFF"
    }
});
