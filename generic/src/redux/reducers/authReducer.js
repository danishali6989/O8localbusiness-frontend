import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { login, register, forgotPassword, chnagePassword, userlogoutbyId, loginstep1,loginstep2 } from '../../api/routes';
const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState({
    status: 'idle',
    token: '',
    username: null,
    pasw: '',
    chngpass: null,
    connectedId: null,
    deviceId: null,
    isAuthenticate: false
});

export const doLogin = createAsyncThunk(
    'auth/Login',
    async ({ data }) => {
        try {
            const response = await login({ data });
            if (response) {

                return response;
            }
        } catch (err) {
            return err;
        }
    },
);

export const doLoginstep1 = createAsyncThunk(
    'auth/Loginstep1',
    async ({ data }) => {
        try {
            const response = await loginstep1({ data });
            if (response) {

                return response;
            }
        } catch (err) {
            return err;
        }
    },
);

export const doLoginstep2 = createAsyncThunk(
    'auth/dologinstep2',
    async ({ data }) => {
        try {
            const response = await loginstep2({ data });
            if (response) {

                return response;
            }
        } catch (err) {
            return err;
        }
    },
);
export const userlogoutbyIdThunk = createAsyncThunk(
    'auth/userLogout',
    async ({ id }) => {

        console.log("logid", id)
        try {
            const response = await userlogoutbyId({ id })

            console.log("response>>", response)
            return response;
        }
        catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    }
)


export const doRegister = createAsyncThunk(
    'auth/Register',
    async ({ data, token }) => {

        try {
            const response = await register({ data, token })
            return response;
        }
        catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    }
)


export const forgotPasswordThunk = createAsyncThunk(
    'forgotpsw/user',
    async ({ data }) => {


        try {

            const response = await forgotPassword({ data })

            return response;


        }
        catch (err) {


            return err;

        }
    }
)
export const changePasswordThunk = createAsyncThunk(
    'changepasw/user',
    async ({ data }) => {

        try {
            const response = await chnagePassword({ data })
            return response;
        }
        catch (err) {
            return err;
        }
    }
)




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getToken(state, action) {

            state.token = action.payload.token;
        },
        clearToken(state, action) {
            state.token = null;
        },

        getData(state, action) {
            state.data = action.payload.response

        },
        clearAuthReducer(state, action) {
            state.token = '',
                state.username = null,
                state.pasw = '',
                state.chngpass = null,
                state.connectedId = null,
                state.deviceId = null,
                state.isAuthenticate = false

        }
    },
    extraReducers: {
        [doLogin.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.isAuthenticate = true
        },
        [doLoginstep1.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.isAuthenticate = true
        },
        [forgotPasswordThunk.fulfilled]: (state, action) => {
            state.pasw = action.payload
        },
        [changePasswordThunk.fulfilled]: (state, action) => {
            state.chngpass = action.payload
        },
        [userlogoutbyIdThunk.fulfilled]: (state, action) => {
            state.logoutbyid = action.payload
        },



    },




});
export const {
    selectAll: selectAllProfiles,
    selectById: selectProfilesById,
} = authAdapter.getSelectors((state) => {
    return state.authReducer;
});


export const {
    getToken,
    clearToken,
    clearAuthReducer
} = authSlice.actions;

export default authSlice.reducer;
