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
import { Input } from 'react-native-elements';
import FirebaseService from '@services/firebase/FirebaseService';
//import AuthUserContext from '@context/AuthUserContext';
import { OnboardingStackScreenProps } from 'types';
import { useState } from 'react';

export default function SignupNickname({ navigation }: OnboardingStackScreenProps<'SignupNickname'>) {

    //static contextType = AuthUserContext;
    const [text, setText] = useState('')

    function createAccount() {

        const firebaseService = new FirebaseService()

        // console.log('Creating profile: ' + this.context.userId)

        // firebaseService.createProfile(this.state.input,this.context.userId)
        //     .then(({ ref }) => {

        //         if (ref != undefined) {
        //             console.log('The profile has been created')
        //             this.context.onLoadingFinished()
        //         }
        //         else{
        //             //Ben : I don't know why it returns 'undefined' even when it succeeds, ignoring errors
        //             console.log('The profile has been created')
        //             this.context.onLoadingFinished()
        //         }
        //     })
    }

    

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Text style={styles.label}>C'est quoi ton prénom?</Text>
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
        backgroundColor: '#2F2F2F'
    },
    label:{
        fontSize: 20,
        textAlign: 'left',
        color: 'white'
    },
    input: {
        height: 60,
        marginTop: 15,
        borderColor: '#A1C332',
        borderWidth: 2,
        borderRadius: 8,
        width: '80%',
        padding: 8,
        color: 'white'
    },
    continueBackground: {
        backgroundColor: '#A1C332',
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
        color: "#FFFFFF"
    }
});