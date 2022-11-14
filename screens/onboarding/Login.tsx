import * as React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    SafeAreaView,
    TouchableOpacity,
    TextInput
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
import { getAuth, signInAnonymously, User } from "firebase/auth";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Constants from 'expo-constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Login({ navigation }: OnboardingStackScreenProps<'Login'>) {

    const [uid, setUid] = useState('')
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
        .then(setVerificationId);
    };

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
        firebase.auth().signInWithCredential(credential).then((result) => {
            console.log(result);
        });
    };

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <View>
            <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={Constants.manifest.extra.firebase}
            />
            <TextInput
            placeholder="Phone Number"
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            autoCompleteType="tel"
            style={styles.textInput}
            />
            <TouchableOpacity
            style={styles.sendVerification}
            onPress={sendVerification}
            >
            <Text style={styles.buttonText}>Send Verification</Text>
            </TouchableOpacity>
            <TextInput
            placeholder="Confirmation Code"
            onChangeText={setCode}
            keyboardType="number-pad"
            style={styles.textInput}
            />
            <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
            <Text style={styles.buttonText}>Send Verification</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAwareScrollView>
    )

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

    // const renderLoading = () => {
    //     if (loading) {
    //         return (
    //             <View>
    //                 <ActivityIndicator size={'large'} />
    //             </View>
    //         );
    //     }
    // }

    // return (
    //     <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
    //         <SafeAreaView style={{ flex: 1 }}>
    //             <KeyboardAvoidingView style={styles.container} behavior="padding">
    //                 <View style={styles.topContainer}>
    //                     <Image style={styles.logo} source={require('@assets/logo.png')} />
    //                     <Text style={styles.header}>
    //                         Spot Performance
    //                     </Text>
    //                     <Text style={styles.subtitle}>
    //                         Make it yours
    //                     </Text>
    //                 </View>
    //                 {renderLoading()}
    //                 <View style={styles.bottomContainer}>
    //                     <TouchableOpacity style={styles.facebookButtonBackground} onPress={() => signInAnynomously()}>
    //                         <Text style={styles.facebookButtonText}>
    //                             Sign-in
    //                         </Text>
    //                     </TouchableOpacity>
    //                 </View>
    //             </KeyboardAvoidingView>
    //         </SafeAreaView>
    //     </TouchableWithoutFeedback>
    // );
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
    },
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        paddingTop: 40,
        paddingBottom: 20,
        paddingHorizontal: 20,
        fontSize: 24,
        borderBottomColor: '#7f8c8d33',
        borderBottomWidth: 2,
        marginBottom: 10,
        textAlign: 'center',
    },
    sendVerification: {
        padding: 20,
        backgroundColor: '#3498db',
        borderRadius: 10,
    },
    sendCode: {
        padding: 20,
        backgroundColor: '#9b59b6',
        borderRadius: 10,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
    },
});
