import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import {
    deleteUserApi, getAlluserData, EditUserApi,
    getRole, toggleSwitch, adminChangepass, getUserDetailById
} from '../../api/routes';
const userAdapter = createEntityAdapter();


// forceReducer 
// force => false
// forceUpdate 

const initialState = userAdapter.getInitialState({
    status: 'idle',
    data: [],
    role: [],
    userDetail: [],
    editdata: null,
    dltdata: null,
    username: null,
    connectedId: null,
    deviceId: null,
    isAuthenticate: false
});



export const getRoleThunk = createAsyncThunk(
    'role/getAllData',
    async () => {
        try {

            const response = await getRole()
            return response;
        }
        catch (err) {
            console.log(err)

        }
    }
)

export const getUserDataByIdThunk = createAsyncThunk(
    'app/getUserDetail',
    async ({ id }) => {
        try {

            const response = await getUserDetailById({ id })
            return response;
        }
        catch (err) {
            return Promise.reject('NETWORK_ERROR');

        }
    }
)





export const getAlluserDatathunk = createAsyncThunk(
    'app/getUser',
    async () => {
        try {

            const response = await getAlluserData()
            return response;
        }
        catch (err) {
            return Promise.reject('NETWORK_ERROR');

        }
    }
)

export const editUserThunk = createAsyncThunk(
    'edit/user',
    async ({ data, token }) => {
        try {
            const response = await EditUserApi({ data, token })
            return response;


        }
        catch (err) {
        }
    }
)


export const deleteUserThunk = createAsyncThunk(
    'delete/user',
    async ({ id, token }) => {


        try {
            const response = await deleteUserApi({ id, token })

            return response

        }
        catch (err) {

        }
    }
)

export const toggelStatusThunk = createAsyncThunk(
    'toggle/status',
    async ({ data, id, token }) => {

        try {
            const response = await toggleSwitch({ data, id, token })

            return response

        }
        catch (err) {

            return err

        }
    }
)

export const adminChangePassThunk = createAsyncThunk(
    'admin/chngpass',
    async ({ data, token }) => {
        try {
            const response = await adminChangepass({ data, token })
            return response
        }
        catch (err) {
            return err
        }
    }
)







const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserState(state, action) {
            state.data = [],
                state.role = [],
                state.userDetail = [],
                state.editdata = null,
                state.dltdata = null,
                state.username = null,
                state.connectedId = null,
                state.deviceId = null,
                state.isAuthenticate = false
        },
    },
    extraReducers: {
        [getRoleThunk.fulfilled]: (state, action) => {
            state.role = action.payload;
        },
        [getAlluserDatathunk.fulfilled]: (state, action) => {
            state.data = action.payload;
        },
        [getUserDataByIdThunk.fulfilled]: (state, action) => {
            state.userDetail = action.payload;
        },
        [editUserThunk.fulfilled]: (state, action) => {
            state.editdata = action.payload

        },
        [deleteUserThunk.fulfilled]: (state, action) => {
            state.dltdata = action.payload;
        },
        [toggelStatusThunk.fulfilled]: (state, action) => {
        },
        [adminChangePassThunk.fulfilled]: (state, action) => {
        }




    },




});
export const {
    clearUserState,
    selectAll: selectAllProfiles,
    selectById: selectProfilesById,
} = userAdapter.getSelectors((state) => {
    return state.userReducer;
});




export default userSlice.reducer;
