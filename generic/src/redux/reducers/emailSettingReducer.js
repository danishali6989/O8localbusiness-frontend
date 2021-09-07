import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { EmailSettingAdd, getAllEmailDetails, EmailSettingUpdate, EmailSettingDelete } from '../../api/routes';
const EmailSettingAdapter = createEntityAdapter();

const initialState = EmailSettingAdapter.getInitialState({
    status: 'idle',
    // screens: [],
    getEmailDetails: [],
    EmailDetailsDelete: null,
    // screensbyRole: null
});



export const EmailSettingAddThunk = createAsyncThunk(
    'setting/emailSettingAdd',
    async ({ data, token }) => {
        try {
            const response = await EmailSettingAdd({ data, token });
            console.log("Emailresponse", response)
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);

export const EmailSettingUpdateThunk = createAsyncThunk(
    'setting/emailSettingAdd',
    async ({ data, token }) => {
        try {
            const response = await EmailSettingUpdate({ data, token });
            console.log("Emailresponse", response)
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);

export const EmailSettingDeleteThunk = createAsyncThunk(
    'delete/user',
    async ({ id, token }) => {

        try {
            const response = await EmailSettingDelete({ id, token })
            return response

        }
        catch (err) {
        }
    }
)

export const getAllEmailDetailsThunk = createAsyncThunk(
    'get/EmailDetails',
    async () => {
        try {
            const response = await getAllEmailDetails();
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);



const emailSlice = createSlice({
    name: 'email',
    initialState,
    reducers: {
        // clearScreen(state, action) {
        //     state.screens = [],
        //         state.ScreendataDelete = null,
        //         state.screensbyRole = null
        // },
    },
    extraReducers: {
        [getAllEmailDetailsThunk.fulfilled]: (state, action) => {
            console.log("hhhhhh", action)
            state.getEmailDetails = action.payload;
        },
        [EmailSettingAddThunk.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.isAuthenticate = true
        },
        [EmailSettingUpdateThunk.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.isAuthenticate = true
        },
        [EmailSettingDeleteThunk.fulfilled]: (state, action) => {
            state.EmailDetailsDelete = action.payload;
        },
       
    }
});
export const {
    selectAll: selectAllProfiles,
    selectById: selectProfilesById,
} = EmailSettingAdapter.getSelectors((state) => {
    return state.EmailSettingAdapter;
});


export const {
    clearScreen
} = emailSlice.actions;

export default emailSlice.reducer;
