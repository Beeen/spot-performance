import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StripeProvider } from '@stripe/stripe-react-native';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from '@screens/home/Home';
import AuthUserProvider from '@context/AuthUserContext';
import { AuthUserContext } from '@context/AuthUserContext';
import Routes from '@navigation/Routes'
import { AuthUserContextType } from 'types';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <StripeProvider
      publishableKey="pk_test_51JWmMXAqPOYdz9ujfTkJ4VNx48TJX3Gtg1m8Pk41qNFMteqOepRHCOUMZQaTL00JZixm9HBTx7gIAzcb8U0PixDA00Hci4fj1w"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
      >
        <SafeAreaProvider>
          <AuthUserProvider>
              <Routes/>
          </AuthUserProvider>
          <StatusBar style="light" />
        </SafeAreaProvider>
      </StripeProvider>
      // To re-use later
      // <SafeAreaProvider>
      //   <Navigation colorScheme={colorScheme} />
      //   <StatusBar />
      // </SafeAreaProvider>
      //   <SafeAreaView style={styles.safeArea}>
      //   <Provider store={store}>
      //     <ReactReduxFirebaseProvider {...rrfProps}>
      //       <AuthUserProvider>
      //         <Routes />
      //       </AuthUserProvider>
      //     </ReactReduxFirebaseProvider>
      //   </Provider>
      // </SafeAreaView>
    );
  }
}
