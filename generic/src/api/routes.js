import { post, get, delte, getid } from './requests';
import { getAppConfiguration } from '../config';

const login = async ({ data }) => {
    const result = await post(getAppConfiguration().BASE_URL + 'UserLogin/Userlogin', { data });
    return result;
};

const loginstep1 = async ({ data }) => {
    const result = await post(getAppConfiguration().BASE_URL + 'UserLogin/UserLoginTwoStep1', { data });
    return result;
};
const loginstep2 = async ({ data }) => {
    const result = await post(getAppConfiguration().BASE_URL + 'UserLogin/UserLoginTwoStep2', { data });
    return result;
};

const userlogoutbyId = async ({ id }) => {

    console.log("checkResult", id)
    const result = await post(getAppConfiguration().BASE_URL + `UserLogin/logout/${id}`)
    console.log("userlogoutbyId", result)
    return result;
}

const register = async ({ data, token }) => {
    const result = await post(getAppConfiguration().BASE_URL + 'User/add', { data, token });
    return result;
}
const forgotPassword = async ({ data }) => {
    const result = await post(getAppConfiguration().BASE_URL + 'UserLogin/forgotPassword?email=' + data.email, { data, token: '' });
    return result;
}

const chnagePassword = async ({ data }) => {
    const result = await post(getAppConfiguration().BASE_URL + 'UserLogin/changePassword?otp=' + data.otp + '&password=' + data.password + '&email=' + data.email, { data, token: '' });
    return result;
}


const getUserDetailById = async ({ id }) => {
    const result = await get(getAppConfiguration().BASE_URL + `User/get-detail/${id}`)
    return result;
}

const getAlluserData = async () => {
    const result = await get(getAppConfiguration().BASE_URL + 'User/get-all')
    return result;
}

const getRole = async () => {
    const result = await get(getAppConfiguration().BASE_URL + 'UserRole/get-all')
    return result;
}


// const getAlluserData = async () => {

//     const result = await get(getAppConfiguration().BASE_URL + 'User/get-all')

//     return result;
// }


const deleteUserApi = async ({ id, token }) => {
    const result = await post(getAppConfiguration().BASE_URL + `User/delete/${id}`, { token })
    return result;
}

const EditUserApi = async ({ data, token }) => {
    const result = await post(getAppConfiguration().BASE_URL + 'User/edit', { data, token })
    return result;
}

const toggleSwitch = async ({ data, id, token }) => {
    const result = await post(getAppConfiguration().BASE_URL + `User/toggle-status/${id}?status=` + data.status, { data, token })
    return result;
}

const adminChangepass = async ({ data, token }) => {
    const result = await post(getAppConfiguration().BASE_URL + 'User/Admin-change-password', { data, token })
    return result;
}


const getScreens = async () => {
    const result = await get(getAppConfiguration().BASE_URL + 'Screen/get-all');
    return result;
};

const getScreensbyRole = async (data) => {
    const result = await get(getAppConfiguration().BASE_URL + 'UserScreenAccess/getScreenAccessByUserRoleId/' + data.id, data.token);
    return result;
}

const AddScreen = async (data) => {
    const result = await post(getAppConfiguration().BASE_URL + 'Screen/add', { data, token: data.token });
    return result;
}
const EditScreen = async (data) => {
    const result = await post(getAppConfiguration().BASE_URL + 'Screen/edit', { data, token: data.token });
    return result;
}
const DeleteScreen = async ({ id, token }) => {
    const result = await post(getAppConfiguration().BASE_URL + `Screen/delete/${id}`, { token })
    return result;
}

const NewScreen = async (data) => {
    const result = await post(getAppConfiguration().BASE_URL + 'UserRole/add', data);
    return result;
}



// <------------------------------------------add role------------------------------------>

const addRole = async ({ data, token }) => {

    const result = await post(getAppConfiguration().BASE_URL + 'UserRole/add', { data, token });
    return result;
}

const updateRole = async ({ data, token }) => {

    const result = await post(getAppConfiguration().BASE_URL + 'UserRole/edit', { data, token });
    return result;
}

const editRoleList = async (data) => {
    const result = await get(getAppConfiguration().BASE_URL + 'UserRole/update-role', data);
    return result;
}

const addScreenAccess = async ({ data, token }) => {

    const result = await post(getAppConfiguration().BASE_URL + 'UserScreenAccess/AddScreenAccess', { data, token });
    return result;
}

const getScreenAccessByUserRoleId = async ({ id, token }) => {
    const result = await get(getAppConfiguration().BASE_URL + `UserScreenAccess/getScreenAccessByUserRoleId/${id}`, token);
    return result;
}

// <!-----------------------------------------------------Language -------------------------------------------------->


const languageGetAll = async () => {
    const result = await get(getAppConfiguration().BASE_URL + 'Languages/get-all');
    return result;
}

const languageUserUpdate = async ({ data, token }) => {
    const result = await post(getAppConfiguration().BASE_URL + 'Languages/UpdateUserLanguage', { data, token });
    return result;
}


const FieldGetAll = async () => {
    const result = await get(getAppConfiguration().BASE_URL + 'Field/get-all');
    return result;
}

const FieldDetailsbylanguage = async (lang_id, token) => {
    const result = await get(getAppConfiguration().BASE_URL + `Field/get-Field-detail-By-Language?lang_id=${lang_id}`, token);
    return result;
}

// <-------------------------------------------------------EmailSetting --------------------------------------->

const EmailSettingAdd = async ({ data, token }) => {
    const result = await post(getAppConfiguration().BASE_URL + 'EmailSetting/add', { data, token });
    return result;
}

const EmailSettingUpdate = async ({ data, token }) => {
    const result = await post(getAppConfiguration().BASE_URL + 'EmailSetting/edit', { data, token });
    return result;
}

const EmailSettingDelete = async ({ id, token }) => {
    const result = await post(getAppConfiguration().BASE_URL + `EmailSetting/delete/${id}`, { token });
    return result;
}


const getAllEmailDetails = async () => {
    const result = await get(getAppConfiguration().BASE_URL + 'EmailSetting/get-all');
    return result;
};

const getAllPermissions = async () => {
    const result = await get(getAppConfiguration().BASE_URL + 'Permi/get-all');
    return result;
};

const AddPermission = async ({ data, token }) => {
    const result = await post(getAppConfiguration().BASE_URL + 'Permi/add', { data, token });
    return result;
}

const GetAllPermission = async () => {
    const result = await get(getAppConfiguration().BASE_URL + 'Permi/get-all');
    return result;
};

const EditPermission = async (data, token) => {
    const result = await post(getAppConfiguration().BASE_URL + 'Permi/edit', { data, token });
    return result;
}

const DeletePermission = async ({ id, token }) => {
    const result = await post(getAppConfiguration().BASE_URL + `Permi/delete/${id}`, { token });
    return result;
}
const AddRolePermission = async ({ data, token }) => {
    const result = await post(getAppConfiguration().BASE_URL + 'RolePermi/add', { data, token });
    return result;
}

const BusinessCategoriesGetAll = async () => {
    const result = await get(getAppConfiguration().BASE_URL + "BusinessCategory/GetAll");
    return result;
};

const BusinessSubCategoriesGetAll = async () => {
    const result = await get(getAppConfiguration().BASE_URL + "BusinessSubCategory/GetAll");
    return result;
};

const formBuildgetAll = async()=>{
    const result = await get(getAppConfiguration().BASE_URL+`Form/GetAll`);
    return result;
}
const formBuildData = async({data})=>{
    console.log("routeDaTA", data)
    const result = await post(getAppConfiguration().BASE_URL + "Form/Add-Form", {data});
    console.log("routeReslt", result)
    return result;
}

export {
    login,
    getScreens,
    DeleteScreen,
    NewScreen,
    register,
    forgotPassword,
    chnagePassword,
    adminChangepass,
    addScreenAccess,
    getRole,
    getAlluserData,
    deleteUserApi,
    EditUserApi,
    editRoleList,
    AddScreen,
    toggleSwitch,
    addRole,
    updateRole,
    EditScreen,
    getScreenAccessByUserRoleId,
    getScreensbyRole,
    languageGetAll,
    languageUserUpdate,
    getUserDetailById,
    userlogoutbyId,
    EmailSettingAdd,
    getAllEmailDetails,
    EmailSettingUpdate,
    EmailSettingDelete,
    FieldGetAll,
    FieldDetailsbylanguage,
    loginstep1,
    AddPermission,
    GetAllPermission,
    getAllPermissions,
    EditPermission,
    DeletePermission,
    AddRolePermission,
    loginstep2,
    BusinessCategoriesGetAll,
    BusinessSubCategoriesGetAll,
    formBuildgetAll,
    formBuildData
};
