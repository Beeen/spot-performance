import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, View} from 'react-native';
import Login from './Login'
import AppLoading from './AppLoading'
import SignupNickname from './SignupNickname'
import { OnboardingStackParamList } from 'types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();

function OnboardingContainer() {
    return (
        <OnboardingStack.Navigator screenOptions={{headerShown: false}}>
            <OnboardingStack.Screen name="AppLoading" component={AppLoading}/>
            <OnboardingStack.Screen name="Login" component={Login}/>
            <OnboardingStack.Screen name="SignupNickname" component={SignupNickname}/>
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