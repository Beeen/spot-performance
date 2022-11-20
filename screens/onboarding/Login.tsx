import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import firebase from '@services/firebase/FirebaseConfig'
import FirebaseService from '@services/firebase/FirebaseService';
import { LogBox } from 'react-native';
//import AuthUserContext from '@context/AuthUserContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useContext, useState, useRef } from 'react';
import { OnboardingStackScreenProps } from 'types';
import { getAuth, PhoneAuthProvider, signInWithPhoneNumber, signInWithCredential ,User, ApplicationVerifier } from "firebase/auth";
import { FirebaseRecaptchaVerifier, FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {firebaseConfig} from '@services/firebase/FirebaseConfig';

export default function Login({ navigation }: OnboardingStackScreenProps<'Login'>) {

    const [uid, setUid] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState("");
    //const applicationVerifier = new FirebaseRecaptchaVerifierModal();
    const recaptchaVerifier = useRef<FirebaseRecaptchaVerifierModal>(null);
    const auth = getAuth();

    const sendVerification = () => {
        // Tuto
        // const phoneProvider = new firebase.auth.PhoneAuthProvider();
        // phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current).then(setVerificationId);

        // Firebase Docs
        // const appVerifier = window.recaptchaVerifier;
        // const auth = getAuth();
        // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        //     .then((confirmationResult) => {
        //     // SMS sent. Prompt user to type the code from the message, then sign the
        //     // user in with confirmationResult.confirm(code).
        //     window.confirmationResult = confirmationResult;
        //     // ...
        //     }).catch((error) => {
        //     // Error; SMS not sent
        //     // ...
        //     });

        // Expo docs
        const phoneProvider = new PhoneAuthProvider(auth);
        phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier!.current!).then((verificationId) => {
            console.log("Verification ID: " + verificationId)
            setVerificationId(verificationId)
        });
    };

    const confirmCode = () => {

        const credential = PhoneAuthProvider.credential(verificationId, code);
        signInWithCredential(auth, credential).then((result) => {
            console.log(result);
        });

        // var credential = firebase.auth.PhoneAuthProvider.credential(confirmationResult.verificationId, code);
        // signInWithCredential(credential).then((result) => {
        //     console.log(result);
        // });
    };

    // const signInAnynomously = () => {
    //     const auth = getAuth(firebase)
    //     signInAnonymously(auth)
    //     .then(() => {
    //         // Signed in..
    //         //onLoginSuccess()
    //     })
    //     .catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         // ...
    //         onLoginFailure(errorMessage)
    //     });
    // }

    // const onLoginSuccess = (authUser: User): void => {

    //     // TODO: Check if the profile exist in database
    //     console.log('onLoginSuccess: ' + authUser.uid)
    //     //this.state.setUserId(authUser.uid)
    //     setUid(authUser.uid)

    //     const firebaseService = new FirebaseService()
    //     firebaseService.loadUser(authUser.uid)
    //         .then(userSnapshot => {
    //             if (userSnapshot.exists()) {
    //                 console.log('onLoginSuccess: The user has an account')
    //                 //this.context.onLoadingFinished()
    //             }
    //             else{
    //                 console.log('onLoginSuccess: The user doesn\'t have an account')
    //                 navigation.navigate('SignupNickname')
    //             }
    //         })
        
    // }

    // const onLoginFailure = (errorMessage: string) => {
    //     setLoading(false)
    //     setErrorMessage(errorMessage)
    // }

    const renderLoading = () => {
        if (loading) {
            return (
                <View>
                    <ActivityIndicator size={'large'} />
                </View>
            );
        }
    }

    const displayPhoneInput = () => {
        return (
            <><TextInput
            placeholder="Phone Number"
            onChangeText={setPhoneNumber}
            autoFocus
            keyboardType="phone-pad"
            autoComplete="tel"
            textContentType="telephoneNumber"
            style={styles.textInput} />
            <TouchableOpacity
                style={styles.sendVerification}
                onPress={sendVerification}
            >
            <Text style={styles.buttonText}>Send Verification</Text>
            </TouchableOpacity></>);
    }

    const displayCodeInput = () => {
        return (
                <><TextInput
                placeholder="Confirmation Code"
                onChangeText={setCode}
                keyboardType="number-pad"
                style={styles.textInput} />
                <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
                    <Text style={styles.buttonText}>Send Verification</Text>
                </TouchableOpacity></>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <FirebaseRecaptchaVerifierModal
                        ref={recaptchaVerifier}
                        firebaseConfig={firebaseConfig}
                    />
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
                    {/* <KeyboardAwareScrollView contentContainerStyle={styles.container}>
                    <View>
                        
                    </View>
                    </KeyboardAwareScrollView> */}
                    <View style={styles.bottomContainer}>
                        {verificationId ?  displayCodeInput() : displayPhoneInput()}
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
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 32,
        fontWeight: "700",
        color: "#CF0E20",
    },
    subtitle: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: "700",
        color: "#CF0E20",
    },
    logo: {
        width: '50%',
        height: '50%',
        resizeMode: 'contain'
    },
    topContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    bottomContainer: {
        flex: 2,
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
    },
    textInput: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 24,
        borderBottomColor: '#7f8c8d33',
        borderBottomWidth: 2,
        marginBottom: 20,
        textAlign: 'center',
        color: 'white'
    },
    sendVerification: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    sendCode: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: 'black',
    },
});
