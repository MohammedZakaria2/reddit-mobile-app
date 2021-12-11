import React from 'react';
import 'react-native-gesture-handler';
import Navigation from './src/Navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {store} from './src/store';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
        {/* <Links /> */}
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
