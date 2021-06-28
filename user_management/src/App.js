
import React, {useEffect} from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useDispatch} from 'react-redux';
import {
  createStoreAndPersistor,
  setAppConfiguration,
  LOCALES,
} from 'generic';
import storage from 'redux-persist/lib/storage';
import {APP_CONFIG} from './utils/config';
import {Router} from './navigation';
const {persistor, store} = createStoreAndPersistor(storage);

window.store=store;

function App() {
  useEffect(() => {
    global.locales = LOCALES;
    global.config = APP_CONFIG;
    setAppConfiguration(APP_CONFIG);

  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Router />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
