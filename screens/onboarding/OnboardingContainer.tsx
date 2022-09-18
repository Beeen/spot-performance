import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import Login from './Login'
import AppLoading from './AppLoading'
import Home from '@screens/Home'
import SignupNickname from './SignupNickname'

const OnboardingStack = createStackNavigator();

function OnboardingContainer() {
    return (
        //<OnboardingStack.Navigator screenOptions={{headerShown: false}} style={styles.navigator}>
        <OnboardingStack.Navigator screenOptions={{headerShown: false}}>
            <OnboardingStack.Screen name="AppLoading" component={AppLoading}/>
            <OnboardingStack.Screen name="Login" component={Login}/>
            <OnboardingStack.Screen name="Nickname" component={SignupNickname}/>
        </OnboardingStack.Navigator>
    )
}

const styles = StyleSheet.create({
    view:{
        flex: 1,
        alignItems: 'center', 
    },
    navigator:{
        backgroundColor: '#2F2F2F'
    }
});
  
export default OnboardingContainer;