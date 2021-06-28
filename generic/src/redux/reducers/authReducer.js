import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { login, register} from '../../api/routes';
const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState({
    status: 'idle',
    token: '',
    username: null,
    connectedId: null,
    deviceId: null,
    isAuthenticate: false
});

export const doLogin = createAsyncThunk(
    'auth/Login',
    async (data) => {
        try {
            const response = await login(data);
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);


export const doRegister=createAsyncThunk(
    'auth/Register',
    async(data)=>{
        try{
            const response=await register(data)
            console.log("doRegister",response)

            return response;


        }
        catch(err){
            return Promise.reject('NETWORK_ERROR');

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

        getData(state,action){
            state.data=action.payload.response

        }
    },
    extraReducers: {
        [doLogin.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.isAuthenticate = true
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
} = authSlice.actions;

export default authSlice.reducer;
