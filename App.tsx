import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from '@navigation/Home';
//import { AuthUserProvider } from '@context/AuthUserProvider';
import Routes from '@navigation/Routes'
import { MyGlobalContext } from '@context/MyGlobalContext';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <MyGlobalContext.Provider value= {{ copy: "Bonjour", setCopy: () => {} }}>
         {/* <AuthUserProvider> */}
            <Routes/>
        {/* </AuthUserProvider> */}
        </MyGlobalContext.Provider>
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
