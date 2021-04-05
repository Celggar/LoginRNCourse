import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persist} from './src/redux/configStore';
import {AppNavigation} from './src/app/AppNavigation';
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
          <AppNavigation />
        </PersistGate>
      </Provider>
    </>
  );
}
export {App};
