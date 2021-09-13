import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';

import accountReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import assignroleReducer from './reducers/assignroleReducer';
import screenReducer from './reducers/screenReducer';
import userAccessScreenReducer from './reducers/userAccessScreen'
import customThemeReducer from './reducers/customThemeReducer';
import languageReducer from './reducers/languageReducer'
import emailSettingReducer from './reducers/emailSettingReducer'
import forceReducer from './reducers/forceReducer';
import permissionReducer from './reducers/permissionReducer';
import rolePermissionReducer from './reducers/rolePermissionReducer';
import loginReducer from './reducers/loginReducer';
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
                screenReducer,
                assignroleReducer,
                userAccessScreenReducer,
                emailSettingReducer,
                customThemeReducer,
                languageReducer,
                forceReducer,
                permissionReducer,
                rolePermissionReducer,
                loginReducer


            }),
        ),
        composedEnhancer,
    );
    const persistor = persistStore(store);
    return { store, persistor };
};
