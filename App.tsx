import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import './global.css';
import { NavigationContainer } from '@react-navigation/native';
import {
  NavigationRef,
  parseAndLogRoute,
  setIsNavigationReady,
} from './src/navigation/navigation';
import RootNavigator from './src/navigation/navigators/RootNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <NavigationContainer
      ref={NavigationRef}
      onReady={setIsNavigationReady}
      onStateChange={parseAndLogRoute}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

export default App;
