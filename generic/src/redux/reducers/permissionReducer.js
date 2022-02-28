import {
    createSlice,
    createSelector,
    createAsyncThunk,
    createEntityAdapter,
} from '@reduxjs/toolkit';

import { EmailSettingAdd,
     getAllEmailDetails, 
     getAllPermissions, 
     EmailSettingUpdate,
      EmailSettingDelete,
       AddPermission, 
       GetAllPermission, EditPermission, DeletePermission,BusinessCategoriesGetAll,BusinessSubCategoriesGetAll,formBuildgetAll, formBuildData, } from '../../api/routes';
const PermissionAdapter = createEntityAdapter();

const initialState = PermissionAdapter.getInitialState({
    status: 'idle',
    getEmailDetails: [],
    PermissionDelete: null,
    getcategories:[],
    getsubcategories:[],
    fieldGetAll:[]


});


export const GetAllPermissionThunk = createAsyncThunk(
    'get/gerPermissions',
    async () => {
        try {
            const response = await getAllPermissions();
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);

export const PermissionAddThunk = createAsyncThunk(
    'setting/permissionAdd',
    async ({ data, token }) => {
        try {
            const response = await AddPermission({ data, token });
            console.log("permissionAddresponse", response)
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);

export const BusinessSubCategoriesGetAllThunk = createAsyncThunk(
    'get/formgetAll',
    async () => {
        try {
            const response = await BusinessSubCategoriesGetAll()
            if (response) {
                return response
            }
        } catch (err) {
            return err
        }
    }
  )

  export const BusinessCategoriesGetAllThunk = createAsyncThunk(
    'get/formgetAll',
    async () => {
        try {
            const response = await BusinessCategoriesGetAll()
            if (response) {
                return response
            }
        } catch (err) {
            return err
        }
    }
  )

  export const addformThunk = createAsyncThunk(
    'add/form',
    async ({data}) => {
        try {
            const response = await formBuildData({data})
  console.log("response",response)
            if (response) {
                return response
            }
  
        } catch (err) {
            return err
        }
    }
  )

  export const addformgetAllThunk = createAsyncThunk(
    'get/formgetAll',
    async () => {
        try {
            const response = await formBuildgetAll()
            if (response) {
                return response
            }
        } catch (err) {
            return err
        }
    }
  )

export const PermissionEditThunk = createAsyncThunk(
    'setting/permiUpdate',
    async (data, token) => {
        try {
            console.log('data>>>>>>>>>', token)
            console.log('data>>>>>>>>>', data)
            const response = await EditPermission(data, token);
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);

export const DeletePermissionThunk = createAsyncThunk(
    'delete/permission',
    async ({ id, token }) => {

        try {
            const response = await DeletePermission({ id, token })
            return response

        }
        catch (err) {
        }
    }
)

export const getAllEmailDetailsThunk = createAsyncThunk(
    'get/EmailDetails',
    async () => {
        try {
            const response = await getAllEmailDetails();
            if (response) {
                return response;
            }
        } catch (err) {
            return Promise.reject('NETWORK_ERROR');
        }
    },
);



const permissionSlice = createSlice({
    name: 'permission',
    initialState,
    reducers: {
        // clearScreen(state, action) {
        //     state.screens = [],
        //         state.ScreendataDelete = null,
        //         state.screensbyRole = null
        // },
    },
    extraReducers: {
        [addformThunk.fulfilled]: (state, action) => {
            state.addData = action.payload;
        },
        [getAllEmailDetailsThunk.fulfilled]: (state, action) => {
            console.log("hhhhhh", action)
            state.getEmailDetails = action.payload;
        },
        [PermissionAddThunk.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.isAuthenticate = true
        },
        [GetAllPermissionThunk.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.isAuthenticate = true
        },
        [PermissionEditThunk.fulfilled]: (state, action) => {
            state.token = action.payload;
            state.isAuthenticate = true
        },
        [DeletePermissionThunk.fulfilled]: (state, action) => {
            state.PermissionDelete = action.payload;
        },
        [BusinessCategoriesGetAllThunk.fulfilled]: (state, action) => {
            state.getcategories = action.payload;
          },
          [BusinessSubCategoriesGetAllThunk.fulfilled]: (state, action) => {
            state.getsubcategories = action.payload;
          },
          [addformgetAllThunk.fulfilled]: (state, action) => {
            state.fieldGetAll = action.payload;
          },

    }
});
export const {
    selectAll: selectAllProfiles,
    selectById: selectProfilesById,
} = PermissionAdapter.getSelectors((state) => {
    return state.PermissionAdapter;
});


export const {
    clearScreen
} = permissionSlice.actions;

export default permissionSlice.reducer;
