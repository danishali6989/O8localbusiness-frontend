
import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { languageGetAll, languageUserUpdate, getUserDetailById, FieldGetAll, FieldDetailsbylanguage } from '../../api/routes';
const langAdapter = createEntityAdapter();

const initialState = langAdapter.getInitialState({
    status: 'idle',
    fieldgetall: [],
    fieldlanguage: [],
    language: [],
    languageUpdate: [],
    userdetail: []
});

export const getUserDataByIdThunk = createAsyncThunk(
    'get/languagebyid',
    async () => {
        try {
            const response = await getUserDetailById();

            return response;

        } catch (err) {
            return err;
        }
    },
);

export const languageAllThunk = createAsyncThunk(
    'get/language',
    async () => {
        try {
            const response = await languageGetAll();

            return response;

        } catch (err) {
            return err;
        }
    },
);

export const languageUserUpdateThunk = createAsyncThunk(
    'languageupdate/language',
    async ({ data, token }) => {
        try {
            const response = await languageUserUpdate({ data, token })
            return response;
        }
        catch (err) {
        }
    }
)


export const FiledGetAllThunk = createAsyncThunk(
    'get/language',
    async () => {
        try {
            const response = await FieldGetAll();

            return response;

        } catch (err) {
            return err;
        }
    },
);


export const FiledGetAllLanguageThunk = createAsyncThunk(
    'get/FiledGetAllLanguageThunk',
    async ( lang_id, token ) => {
        try {
            const response = await FieldDetailsbylanguage( lang_id, token );
            return response;

        } catch (err) {
            return err;
        }
    },
);




const langSlice = createSlice({
    name: 'lang',
    initialState,
    reducers: {
        clearLanguage(state, action) {
            state.language = [],
                state.languageUpdate = [],
                state.userdetail = []
        },
    },
    extraReducers: {
        [languageAllThunk.fulfilled]: (state, action) => {
            state.language = action.payload;
        },
        [FiledGetAllThunk.fulfilled]: (state, action) => {
            state.fieldgetall = action.payload;
        },
        [FiledGetAllLanguageThunk.fulfilled]: (state, action) => {
            state.fieldlanguage = action.payload;
        },
        [languageUserUpdateThunk.fulfilled]: (state, action) => {
            state.languageUpdate = action.payload;
        },
        [getUserDataByIdThunk.fulfilled]: (state, action) => {
            state.userdetail = action.payload;
        },




    },




});
export const {
    selectAll: selectAllProfiles,
    selectById: selectProfilesById,
} = langAdapter.getSelectors((state) => {
    return state.languageReducer;
});


export const {
    getToken,
    clearToken,
    clearLanguage,
} = langSlice.actions;

export default langSlice.reducer;