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
import AuthUserContext from '@context/AuthUserContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

type MyProps = {
    // using `interface` is also ok
    message: string;
    navigation: NativeStackNavigationProp<any,any>;
  };
type MyState = {
    errorMessage: string;
    loading: boolean;
    uid: string;
};
class LoginScreen extends React.Component<MyProps, MyState> {
    static navigation = useNavigation();

    static contextType = AuthUserContext;
    state: MyState = { errorMessage: '', loading: false, uid: '' };

    constructor(props: MyProps) {
        super(props)
    }

    signInAnynomously = () => {

    }

    onLoginSuccess(authUser) {

        // TODO: Check if the profile exist in database
        console.log('onLoginSuccess: ' + authUser.uid)
        //this.state.setUserId(authUser.uid)
        this.setState((uid) => ({
            uid: authUser.uid,
          }));

        const firebaseService = new FirebaseService()
        firebaseService.loadUser(authUser.uid)
            .then(({ userSnapshot }) => {
                if (userSnapshot.exists) {
                    console.log('onLoginSuccess: The user has an account')
                    this.context.onLoadingFinished()
                }
                else{
                    console.log('onLoginSuccess: The user doesn\'t have an account')
                    this.props.navigation.navigate('Nickname')
                }
            })
        
    }

    onLoginFailure(errorMessage: string) {
        this.setState({ errorMessage: errorMessage, loading: false });
    }

    renderLoading() {
        if (this.state.loading) {
            return (
                <View>
                    <ActivityIndicator size={'large'} />
                </View>
            );
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
                <SafeAreaView style={{ flex: 1 }}>
                    <KeyboardAvoidingView style={styles.container} behavior="padding">
                        <View style={styles.topContainer}>
                            <Image style={styles.logo} source={require('@assets/logo-green.png')} />
                            <Text style={styles.header}>
                                YourFeed
                            </Text>
                            <Text style={styles.subtitle}>
                                Supporte tes artistes locaux
                            </Text>
                        </View>
                        {this.renderLoading()}
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity style={styles.facebookButtonBackground} onPress={() => this.signInAnynomously()}>
                                <Text style={styles.facebookButtonText}>
                                    Me connecter avec Facebook
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        );
    }

    componentDidMount() {

    }
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

export default LoginScreen;
