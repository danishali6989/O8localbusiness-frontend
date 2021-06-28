import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistReducer, persistStore} from 'redux-persist';

import accountReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import assignroleReducer from './reducers/assignroleReducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

export const createStoreAndPersistor = (storage) => {
    const persistConfig = {
        key: 'root',
        storage: storage,
    };
    const store = createStore(
        persistReducer(
            persistConfig,
            combineReducers({
                accountReducer,
                userReducer,
                assignroleReducer,
            }),
        ),
        composedEnhancer,
    );
    const persistor = persistStore(store);
    return {store, persistor};
};
