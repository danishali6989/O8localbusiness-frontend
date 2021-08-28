
import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { addScreenAccess, getScreenAccessByUserRoleId } from '../../api/routes';
const screenAdapter = createEntityAdapter();

const initialState = screenAdapter.getInitialState({
    status: 'idle',
    Accscreens: [],
    data: []
});





export const addScreenAccessThunk = createAsyncThunk(
    'userAccess/screen',
    async ({ data, token }) => {

        try {
            const response = await addScreenAccess({ data, token });
            if (response) {
                return response;
            }
        } catch (err) {

        }
    },
);


export const getScreenAccessByUserRoleIdThunk = createAsyncThunk(
    'getUserAccess/screen',
    async ({ id, token }) => {

        try {
            const response = await getScreenAccessByUserRoleId({ id, token });
            if (response) {
                return response;
            }
        } catch (err) {

        }
    },


)

const userAccessScreenSlice = createSlice({
    name: 'accessScreen',
    initialState,
    reducers: {
        clearAcessScreen(state, action) {
            state.Accscreens= [],
            state.data= []
        },
    },
    extraReducers: {
        [addScreenAccessThunk.fulfilled]: (state, action) => {
            state.Accscreens = action.payload;
        },
        [getScreenAccessByUserRoleIdThunk.fulfilled]: (state, action) => {
            state.data = action.payload
        }
    }
});
export const {
    selectAll: selectAllProfiles,
    selectById: selectProfilesById,
} = screenAdapter.getSelectors((state) => {
    return state.screenAdapter;
});


export const {
    clearAcessScreen
} = userAccessScreenSlice.actions;

export default userAccessScreenSlice.reducer;
