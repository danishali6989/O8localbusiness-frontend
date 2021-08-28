import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { NewScreen } from '../../api/routes';

const NewScreenauthAdapter = createEntityAdapter();

const initialState = NewScreenauthAdapter.getInitialState({
    status: 'idle',
    token: '',
    username: null,
    connectedId: null,
    deviceId: null,
    NewScreen: [],
    isAuthenticate: false
});

export const Newscreen = createAsyncThunk(
    'auth/NewScreenAdd',
    async (data) => {
        try {
            const response = await NewScreen(data);
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);

const NewscreenSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // getToken(state, action) {

        //     state.token = action.payload.token;
        // },
        // clearToken(state, action) {
        //     state.token = null;
        // },
    },
    extraReducers: {
        [Newscreen.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.isAuthenticate = true
        },
    }
});



export const {
    selectAll: selectAllProfiles,
    selectById: selectProfilesById,
} = NewScreenauthAdapter.getSelectors((state) => {
    return state.authReducer;
});


export const {
    
} = NewscreenSlice.actions;

export default NewscreenSlice.reducer;
