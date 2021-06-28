import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { getScreens } from '../../api/routes';
const screenAdapter = createEntityAdapter();

const initialState = screenAdapter.getInitialState({
    status: 'idle',
    screens:[]
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




export const fetchScreens = createAsyncThunk(
    'screen/list',
    async () => {
        try {
            const response = await getScreens();
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);



const screenSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchScreens.fulfilled]: (state, action) => {
            console.log(" action.payload", action.payload)
            state.screens = action.payload;
        },
    }
});
export const {
    selectAll: selectAllProfiles,
    selectById: selectProfilesById,
} = screenAdapter.getSelectors((state) => {
    console.log("state.screenAdapter",state.screenAdapter)
    return state.screenAdapter;
});


export const {
} = screenSlice.actions;

export default screenSlice.reducer;
