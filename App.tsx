import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
      <SafeAreaProvider>
         <AuthUserProvider>
            <Routes/>
        </AuthUserProvider>
      </SafeAreaProvider>
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
