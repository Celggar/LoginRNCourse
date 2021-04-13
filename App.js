import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {Root} from 'native-base';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persist} from './src/redux/configStore';
import {AppNavigation} from './src/app/AppNavigation';
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persist}>
          <Root>
            <AppNavigation />
          </Root>
        </PersistGate>
      </Provider>
    </>
  );
}
export {App};
