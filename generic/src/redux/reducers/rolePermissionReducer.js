import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';

import { AddRolePermission,  } from '../../api/routes';
const RolePermissionAdapter = createEntityAdapter();

const initialState = RolePermissionAdapter.getInitialState({
    status: 'idle',
    getEmailDetails: [],
    PermissionDelete: null,

});


export const GetAllPermissionThunk = createAsyncThunk(
    'get/gerPermissions',
    async () => {
        try {
            const response = await getAllPermissions();
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);

export const AddPermissionAddThunk = createAsyncThunk(
    'setting/rolepermissionAdd',
    async ({ data, token }) => {
        try {
            const response = await AddRolePermission({ data, token });
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);



const rolePermissionSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        // clearScreen(state, action) {
        //     state.screens = [],
        //         state.ScreendataDelete = null,
        //         state.screensbyRole = null
        // },
    },
    extraReducers: {
      
        [AddPermissionAddThunk.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.isAuthenticate = true
        },
        [GetAllPermissionThunk.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.isAuthenticate = true
        },
       

    }
});
export const {
    selectAll: selectAllProfiles,
    selectById: selectProfilesById,
} = RolePermissionAdapter.getSelectors((state) => {
    return state.RolePermissionAdapter;
});


export const {
    clearScreen
} = rolePermissionSlice.actions;

export default rolePermissionSlice.reducer;
