import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import { login, register, forgotPassword, chnagePassword } from '../../api/routes';
const authAdapter = createEntityAdapter();
// const CustomAdapter = createEntityAdapter();


const initialState = authAdapter.getInitialState({
    newTheme: 'light'
});



const customThemeSlice = createSlice({
    name: 'customTheme',
    initialState,
    reducers: {
        setCustomTheme(state, action) {
            state.newTheme = action.payload;
        },
        clearCustomeTheme(state, action) {
            state.newTheme = 'light'
        },
    },
});


export const {
    setCustomTheme,
    clearCustomeTheme
} = customThemeSlice.actions;

export default customThemeSlice.reducer;