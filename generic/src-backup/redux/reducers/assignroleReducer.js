import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { addRole, updateRole } from '../../api/routes';

const assignroleAdapter = createEntityAdapter();

const initialState = assignroleAdapter.getInitialState({
    status: 'idle',
    fetchRoleList: [],
    editRoleThunk: [],
    editData: false
});

export const addRoleThunck = createAsyncThunk(
    'add/role',
    async ({ data, token }) => {



        try {
            const response = await addRole({ data, token });
            if (response) {

                return response;

            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);





export const updateRoleThunck = createAsyncThunk(
    'update/role',
    async ({ data, token }) => {


        try {
            const response = await updateRole({ data, token });


            return response;

        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);

export const editRoleThunk = createAsyncThunk(
    'edit/role',
    async (data) => {
        try {
            const response = await editRoleList(data);
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
)
const assignSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        getToken(state, action) {
            state.token = action.payload.token;
        },
        clearAssignRoleState(state) {
            state.fetchRoleList = [],
                state.editRoleThunk = [],
                state.editData = false
        },

    },
    extraReducers: {
        [addRoleThunck.fulfilled]: (state, action) => {

        },
        [editRoleThunk.fulfilled]: (state, action) => {
            state.fetchEditList = action.payload;
        },
        // [editRoleThunk.fulfilled]: (state, action) => {
        //     state.token = action.payload;
        //     state.isAuthenticate = true
        // },


        [updateRoleThunck.fulfilled]: (state, action) => {

        }
    }
});
export const {
    selectAll: selectAllProfiles,
    selectById: selectProfilesById,
} = assignroleAdapter.getSelectors((state) => {
    return state.assignroleAdapter;
});


export const {
    clearAssignRoleState,
} = assignSlice.actions;

export default assignSlice.reducer;
