export {createStoreAndPersistor} from './src/redux/store';
export {
  doLogin,
  getToken,
  clearToken,
} from './src/redux/reducers/authReducer';


export {
  fetchScreens
} from './src/redux/reducers/screenReducer';

export {
  Newscreen
} from './src/redux/reducers/newscreenReducer';

export {
  fetchRoleList
} from './src/redux/reducers/assignroleReducer';


export {
  login,
} from './src/api/routes';
export {setAppConfiguration, LOCALES} from './src/config';
