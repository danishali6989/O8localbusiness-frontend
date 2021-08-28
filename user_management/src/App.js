
import React, { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider} from 'react-redux';
import {
  createStoreAndPersistor,
  setAppConfiguration,
  LOCALES,
} from 'generic';
import storage from 'redux-persist/lib/storage';
import { APP_CONFIG } from './utils/config';
import { Router } from './navigation';
import { SnackbarProvider } from 'notistack';
import Zoom from '@material-ui/core/Zoom';
import history from 'connect-history-api-fallback'

const { persistor, store } = createStoreAndPersistor(storage);


window.store = store;

function App() {


// app.use(history({
//     rewrites:[
//         {from: /^\/api\/.*$/, to: function(context){
//             return context.parsedUrl.pathname;
//         }},
//         {from: /\/.*/, to: '/'}
//     ]
// }))

// app.get('/', function(req, res, next){
//     res.render('index');
// })

// app.use('/api', api);

  useEffect(() => {
    global.locales = LOCALES;
    global.config = APP_CONFIG;
    setAppConfiguration(APP_CONFIG);

  }, []);
  return (
   
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider maxSnack={3}
            TransitionComponent={Zoom}
          >
            <div className="App">
              <Router />
            </div>
          </SnackbarProvider>
        </PersistGate>
      </Provider>

  );
}

export default App;
