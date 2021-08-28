import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { getScreens, AddScreen, EditScreen, DeleteScreen, NewScreen, getScreensbyRole } from '../../api/routes';
const screenAdapter = createEntityAdapter();

const initialState = screenAdapter.getInitialState({
    status: 'idle',
    screens: [],
    ScreendataDelete: null,
    screensbyRole: null
});



export const ScreenAdd = createAsyncThunk(
    'screen/screenadd',
    async (data) => {
        try {
            const response = await AddScreen(data);
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);

export const EditScreenUpdate = createAsyncThunk(
    'screen/editScreen',
    async (data) => {
        try {
            const response = await EditScreen(data);
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);

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


export const fetchScreens = createAsyncThunk(
    'get/screen',
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

export const fetchScreensbyRole = createAsyncThunk(
    'screen/list',
    async (data) => {
        try {
            const response = await getScreensbyRole(data);
            if (response) {
                return response;
            }
        } catch (err) {
            return erro;
        }
    },
);

export const deleteScreenid = createAsyncThunk(
    'delete/user',
    async ({ id, token }) => {

        try {
            const response = await DeleteScreen({ id, token })
            return response

        }
        catch (err) {
        }
    }
)

const screenSlice = createSlice({
    name: 'screen',
    initialState,
    reducers: {
        clearScreen(state, action) {
            state.screens = [],
                state.ScreendataDelete = null,
                state.screensbyRole = null
        },
    },
    extraReducers: {
        [fetchScreens.fulfilled]: (state, action) => {
            console.log("hhhhhh", action)
            state.screens = action.payload;
        },
        [ScreenAdd.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.isAuthenticate = true
        },
        [EditScreenUpdate.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.isAuthenticate = true
        },
        [deleteScreenid.fulfilled]: (state, action) => {
            state.ScreendataDelete = action.payload;
        },
        [fetchScreensbyRole.fulfilled]: (state, action) => {

            state.screensbyRole = action.payload;
        },
    }
});
export const {
    selectAll: selectAllProfiles,
    selectById: selectProfilesById,
} = screenAdapter.getSelectors((state) => {
    return state.screenAdapter;
});


export const {
    clearScreen
} = screenSlice.actions;

export default screenSlice.reducer;
