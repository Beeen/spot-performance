import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthUserContext from '@context/AuthUserContext';

import firebase from '@services/firebase/FirebaseConfig';

import Home from '@navigation/Home';
import OnboardingContainer from '@screens/onboarding/OnboardingContainer';
import AppLoading from '@screens/onboarding/AppLoading';
import useColorScheme from '../hooks/useColorScheme';

export default function Routes() {

  const authContext = useContext(AuthUserContext)
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer>
      {authContext.isLoading ? <OnboardingContainer /> : <Home colorScheme={colorScheme} />}
    </NavigationContainer>
  );
}