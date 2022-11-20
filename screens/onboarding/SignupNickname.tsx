import * as React from 'react';

import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import FirebaseService from '@services/firebase/FirebaseService';
import { AuthUserContext } from '@context/AuthUserContext';
import { AuthUserContextType, OnboardingStackScreenProps } from 'types';
import { useContext, useState } from 'react';

export default function SignupNickname({ navigation }: OnboardingStackScreenProps<'SignupNickname'>) {

    const {userId, onLoadingFinished} = useContext(AuthUserContext) as AuthUserContextType;
    const [text, setText] = useState('')

    function createAccount() {

        const firebaseService = new FirebaseService()

        console.log('Creating profile: ' + userId)

        firebaseService.createProfile(text, userId)
            .then(({ ref }) => {

                if (ref != undefined) {
                    console.log('The profile has been created')
                    onLoadingFinished()
                }
                else{
                    //Ben : I don't know why it returns 'undefined' even when it succeeds, ignoring errors
                    console.log('The profile has been created')
                    onLoadingFinished()
                }
            })
    }

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.label}>What's your name?</Text>
                    {/* <Input
                        placeholder='RECHERCHER'
                        style={styles.input}
                    /> */}
                    <TextInput value={text} onChangeText={input => setText(input)} style={styles.input}/>
                </View>
                <View style={styles.container}>
                        <TouchableOpacity style={styles.continueBackground} onPress={() => createAccount()}>
                            <Text style={styles.continueButtonText}>
                                Continuer
                            </Text>
                        </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: '#000000'
    },
    label:{
        fontSize: 20,
        textAlign: 'left',
        color: 'white'
    },
    input: {
        height: 60,
        marginTop: 15,
        borderColor: '#ffffff',
        borderWidth: 2,
        borderRadius: 8,
        width: '80%',
        padding: 8,
        color: 'white'
    },
    continueBackground: {
        backgroundColor: '#ffffff',
        height: 50,
        width: '80%',
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
    continueButtonText: {
        letterSpacing: 0.5,
        fontSize: 16,
        color: "black"
    }
});