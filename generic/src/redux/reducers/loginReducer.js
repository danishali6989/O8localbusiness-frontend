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
    logindata: {}
});



const logintwostepSlice = createSlice({
    name: 'loginTwostep',
    initialState,
    reducers: {
        setlogindata(state, action) {
            state.logindata = action.payload;
        },
        // clearCustomeTheme(state, action) {
        //     state.newTheme = 'light'
        // },
    },
});


export const {
    setlogindata,
    clearCustomeTheme
} = logintwostepSlice.actions;

export default logintwostepSlice.reducer;