import { post, get, delte } from './requests';
import { getAppConfiguration } from '../config';

const login = async (data) => {
    const result = await post(getAppConfiguration().BASE_URL + 'UserLogin/Userlogin', data);
    return result;
};

const register = async (data) => {
    const result = await post(getAppConfiguration().BASE_URL + 'User/add', data);

    return result;
}

const getData = async () => {

    const result = await get(getAppConfiguration().BASE_URL + 'UserRole/get-all')
    return result;
}


const getAlluserData = async () => {
    const result = await get(getAppConfiguration().BASE_URL + 'User/get-all')
    return result;
}


const deleteUserApi = async (id) => {
    console.log(id)
    const result = await post(getAppConfiguration().BASE_URL + `User/delete/${id}`)
    console.log("deleteUserApi", result)
    return result;
}

const EditUserApi = async (id, data) => {
    console.log(id)
    const result = await post(getAppConfiguration().BASE_URL + 'User/edit', data)
    console.log("updateUserApi", result)
    return result;
}


const getScreens = async () => {
    const result = await get(getAppConfiguration().BASE_URL + 'UserScreenAccess/getAllScreens');
    return result;
};

const NewScreen = async (data) => {
    const result = await post(getAppConfiguration().BASE_URL + 'UserRole/add', data);
    return result;
}

const getRoleList = async () => {
    const result = await get(getAppConfiguration().BASE_URL + 'UserRole/get-all');
    return result;
}

export {
    login,
    getScreens,
    NewScreen,
    getRoleList,
    register,
    getData,
    getAlluserData,
    deleteUserApi,
    EditUserApi
};
