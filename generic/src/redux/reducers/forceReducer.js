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



const initialState = userAdapter.getInitialState({

    force: false

});


const customForceUpdate = createSlice({
    name: 'ForceReducer',
    initialState,
    reducers: {
        setForceReducer(state, action) {
            state.force = action.payload;
        },
        // clearCustomeTheme(state, action) {
        //     state.force = null
        // },
    },
});


export const {
    setForceReducer,
    clearCustomeTheme
} = customForceUpdate.actions;

export default customForceUpdate.reducer;