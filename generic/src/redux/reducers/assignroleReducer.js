import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { getRoleList } from '../../api/routes';

const assignroleAdapter = createEntityAdapter();

const initialState = assignroleAdapter.getInitialState({
    status: 'idle',
    fetchRoleList: []
});

export const addScreen = createAsyncThunk(
    'screen/add',
    async (data) => {
        try {
            // const response = await login(data);
            // if (response) {
            //     return response;
            // }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);




export const fetchRoleList = createAsyncThunk(
    'screen/list',
    async () => {
        try {
            const response = await getRoleList();
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);



const assignSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchRoleList.fulfilled]: (state, action) => {
            console.log("fetchRoleList <<<<", action.payload)
            state.screens = action.payload;
        },
    }
});
export const {
    selectAll: selectAllProfiles,
    selectById: selectProfilesById,
} = assignroleAdapter.getSelectors((state) => {
    console.log("state.screenAdapter", state.assignroleAdapter)
    return state.assignroleAdapter;
});


export const {
} = assignSlice.actions;

export default assignSlice.reducer;
