import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';
import {deleteUserApi, getAlluserData, getData} from '../../api/routes';
const authAdapter = createEntityAdapter();

const initialState = authAdapter.getInitialState({
    status: 'idle',
    data:{},
    role:{},
    username: null,
    connectedId: null,
    deviceId: null,
    isAuthenticate: false
});



export const getAllData=createAsyncThunk(
    'app/getAllData',
    async()=>{
        try{
            const response=await getData()
            // console.log("getData",response)

            return response;


        }
        catch(err){
            return Promise.reject('NETWORK_ERROR');

        }
    }
)

export const getAlluserDatathunk=createAsyncThunk(
    'app/User',
    async()=>{
        try{
            const response=await getAlluserData()
            // console.log("getAlluserData",response)

            return response;


        }
        catch(err){
            return Promise.reject('NETWORK_ERROR');

        }
    }
)

export const deleteUserThunk=createAsyncThunk(
    'app/user',
    async(id)=>{
        try{
            const response=await deleteUserApi(id)
            console.log(response)
            return response

        }
        catch(err){
            console.log(err)
        }
    }
)

export const editUserThunk=createAsyncThunk(
    'app/user',
    async(data)=>{
        try{
            const response=await deleteUserApi(data)
console.log(response)
return response;


        }
        catch(err){
            console.log(err)
        }
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        getData(state,action){
            state.data=action.payload.response

        }
    },
    extraReducers: {
        [getAllData.fulfilled]: (state, action) => {
            console.log("action",action)
            // state.role = action.payload;
        },
        [getAlluserDatathunk.fulfilled]: (state, action) => {

            // console.log("action",action)
            state.data = action.payload;
        },
        [editUserThunk.fulfilled]:(state,action)=>{
            state.data=action.payload

        },
        [deleteUserThunk.fulfilled]:(state,action)=>{
            state.data = null;


        }


    

    },




});
export const {
    selectAll: selectAllProfiles,
    selectById: selectProfilesById,
} = authAdapter.getSelectors((state) => {
    return state.userReducer;
});



export default userSlice.reducer;
