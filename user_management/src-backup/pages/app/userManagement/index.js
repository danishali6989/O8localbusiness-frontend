import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { AppConainer } from '../../../components'
import { confirmAlert } from 'react-confirm-alert';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button, IconButton } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Edit from '@material-ui/icons/Edit';
import { SignUp } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getAlluserDatathunk } from 'generic/src/redux/reducers/userReducer';
import { toggelStatusThunk, FiledGetAllLanguageThunk, getUserDataByIdThunk, getScreenAccessByUserRoleIdThunk } from 'generic';
import { DailogeBox } from '../../../components/DailogBox';
import { useCustomNotify } from '../../../components';
import { useUserData } from '../../../hooks/useUserData'


const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },


    container: {
        width: '100%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

    submit: {
        margin: theme.spacing(3, 1, 2),
    },
}))




export const UserManagement = () => {
    let gridRef = useRef(null);
    let paramsData;
    const userData = useUserData();
    console.log("userData", userData)
    const getTheme = useSelector(state => state.customThemeReducer.newTheme);
    const permissions = useSelector(({ screenReducer }) => screenReducer.screensbyRole);
    console.log("state", permissions)
    const langField = useSelector((state) => state.languageReducer.fieldlanguage);
    const permissionlist = useSelector((state) => state.userAccessScreenReducer.data);
    console.log("permissionlist", permissionlist)
    const [userEditData, setUserEditData] = useState(null);
    const [passwrdData, setPasswrdData] = useState(null)
    const [refresh, setRefresh] = useState('')
    const user = useSelector((state) => state.userReducer.data)
    const classes = useStyles();
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [paswordOpen, setPaswordOpen] = useState(false)
    const [gridApi, setGridApi] = useState(null);
    const [accessList, setAccessList] = useState([]);
    console.log("accessList>>>>", accessList)
    const CustomNotify = useCustomNotify();


    const handleClickOpen = () => {
        setUserEditData(null)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handlePasswordOpen = () => {
        setPaswordOpen(true)
    }

    const handlePasswordClose = () => {
        setPaswordOpen(false)
    }

    const onGridReady = (params) => {
        setGridApi(params.api);
        paramsData = params.api;
        gridRef.current = params.api;
        params.api.showLoadingOverlay();

        const getAllData = async () => {
            const result = await dispatch(getAlluserDatathunk())
            params.api.setRowData(result.payload);
        };
        getAllData();
        params.api.sizeColumnsToFit();
    }

    const customLoading = () => {
        return <CircularProgress color="primary" />
    };

    const renderField = (value) => {
        let screenName = value;
        if (langField) {
            let filterField = langField.filter(i => i.field === value);
            if (filterField.length > 0) {
                screenName = filterField[0].description;
            };
        };
        return screenName;
    };

    useEffect(() => {
        permiRolelist();

    }, [])

    const permiRolelist = async () => {
        const token = window.localStorage.getItem('token')
        const id = userData.RoleId;
        const result = await dispatch(getScreenAccessByUserRoleIdThunk({ id, token }));
        console.log("result>>>", result)
        let getScreenId = result.payload.screens.filter((i) => i.screenName === "User");
        let filterAccessList = result.payload.permissions.filter((i) => i.screenId === getScreenId[0].screenId);
        setAccessList(filterAccessList)
    };

    const accessActionBtn = (btn) => {
        let accessBtn = accessList.find((i) => i.permin_title === btn);
        return accessBtn ? false : true;
    }



    const fieldRender = (event) => {
        if (event.colDef.field === "bg_color") {

            return `<div style="background-color:red;width:100%;height:100%;"></div>`;
        } else {
            if (event.data.status === 3) {
                return `
                    <div style="width='100%', background='red' ">
                    <div
                    style="
                            content: '';
                            width: 120%;
                            height: 1px;
                            background: #bfbdbd;
                            display: block;
                            position: absolute;
                            top: 20px;
                            padding-left:17px;padding-right:17px;"
                    ></div>
                    <div style="width:100%;height:100%;padding-left:17px;padding-right:17px;color:#bfbdbd">${event.value}</div>
                    </div>
				`;
            } else if (event.data.status === 2) {
                return `<div style="color:#dddddd;width:100%;height:100%;padding-left:17px;padding-right:17px;">${event.value}</div>`;
            } else {
                return `<div style="width:100%;height:100%;padding-left:17px;padding-right:17px;">${event.value}</div>`;
            }
        }
    };




    const onActivated = () => {
        gridApi.showLoadingOverlay();
        let filteredActivated = user.filter(i => i.status === 1);
        if (filteredActivated.length > 0) {
            setTimeout(() => {
                gridApi.setRowData(filteredActivated);

            }, [500]);
        } else {
            CustomNotify(renderField('No Activated User found'), "error");
            gridApi.setRowData();
            gridApi.hideOverlay();
        };
    }

    const onDisabled = () => {
        gridApi.showLoadingOverlay();
        let filteredDisabled = user.filter(i => i.status === 2);
        if (filteredDisabled.length > 0) {
            setTimeout(() => {
                gridApi.setRowData(filteredDisabled);
            }, [500]);
        } else {
            CustomNotify(renderField('No Disabled User found'), "error");
            gridApi.setRowData();
            gridApi.hideOverlay();
        };
    };

    const onDeleted = () => {
        gridApi.showLoadingOverlay();
        let filteredDeleted = user.filter(i => i.status === 3);
        if (filteredDeleted.length > 0) {
            setTimeout(() => {
                gridApi.setRowData(filteredDeleted);
            }, [500]);
        } else {
            CustomNotify(renderField('No Deleted User found'), "error");
            gridApi.setRowData();
            gridApi.hideOverlay();
        };
    };


    const onShowAll = () => {
        gridApi.showLoadingOverlay();
        setTimeout(() => {
            gridApi.setRowData(user);
        }, [500]);
    };

    const deleteHandler = async (params) => {
        paramsData.showLoadingOverlay();
        const id = params.id
        const token = window.localStorage.getItem('token')
        let status = params.status;
        let textValue = 'Activated  Successfully'
        if (params.status === 3) {
            textValue = 'Activated  Successfully';
            status = 1;
        } else {
            status = 3;
            textValue = 'Deleted Sucessfully';
        }
        const data = {
            status: status
        };

        const result = await dispatch(toggelStatusThunk({ data, id, token }));
        const resultUser = await dispatch(getAlluserDatathunk());
        if (result.payload == "Status Updated") {
            const user = await fetchUserData();
            if (user !== null && user !== undefined) {
                const langId = user.payload?.langId;
                let text = await changeLanguageField(langId, textValue);
                CustomNotify(text, "success");
            }
            paramsData.setRowData(resultUser.payload);
        } else {
            paramsData.hideOverlay();
        }
    }
    const changePassword = (data) => {
        setPaswordOpen(true);
        setPasswrdData(data);
    };

    const editHandler = (data) => {
        setUserEditData(data)
        setOpen(true)
    };

    const fetchUserData = async () => {
        if (userData !== null) {
            const result = await dispatch(getUserDataByIdThunk({ id: userData.id }))
            return result;
        }
        return null;
    };

    const fetchFields = async (id) => {
        const token = window.localStorage.getItem('token')
        const lang_id = id;
        const result = await dispatch(FiledGetAllLanguageThunk(lang_id, token));
        console.log("result....fetchFields", result)
        return result;
    };

    const changeLanguageField = async (langId, value) => {
        const fields = await fetchFields(langId);
        let screenName = value;
        if (fields.payload) {
            let filterField = fields.payload.filter(i => i.field === value);
            if (filterField.length > 0) {
                screenName = filterField[0].description;
            };
        };
        return screenName;
    }

    const changeStatus = async (userData) => {
        paramsData.showLoadingOverlay();
        const token = window.localStorage.getItem('token')
        const id = userData.id;
        let status = 1;
        let textValue = 'Activated  Successfully';
        if (userData.status === 2 || userData.status === 3) {
            status = 1;
            textValue = 'Activated  Successfully';
        } else {
            status = 2;
            textValue = 'Deactivated  Successfully';
        }
        const data = {
            status: status
        }
        const result = await dispatch(toggelStatusThunk({ data, id, token }));
        const resultUser = await dispatch(getAlluserDatathunk());
        if (result.payload === "Status Updated") {
            const user = await fetchUserData();
            console.log("user>>>", user)
            if (user !== null && user !== undefined) {
                const langId = user.payload?.langId;
                let text = await changeLanguageField(langId, textValue);
                CustomNotify(text, "success");
            }
            paramsData.setRowData(resultUser.payload);

        } else {
            CustomNotify(renderField('something went wrong'), "error");
            paramsData.hideOverlay();
        }
    };

    const editRender = (params) => {
        return <IconButton
            edge="start"
            aria-label="open drawer"
            variant="contained"
            color="primary"
            onClick={() => { editHandler(params.data) }}>
            <Edit fontSize="small" />
        </IconButton>;
    };

    const statusRender = (params) => {
        return <FormControlLabel
            control={
                <Switch
                    checked={params.data.status === 1 ? false : true}
                    onChange={() => { changeStatus(params.data) }}
                    color="primary"
                    name="checkedB"
                    label="Status"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                    style={{ fontSize: 25 }}
                />
            }
        />;
    };

    const deleteRender = (params) => {
        return <FormControlLabel
            control={
                <Switch
                    checked={params.data.status === 3 ? false : true}
                    onChange={() => { deleteHandler(params.data) }}
                    name="isdelete"
                    style={{ fontSize: 20 }}
                />
            }
        />;
    };


    const passwordRender = (params) => {
        return <IconButton
            edge="start"
            aria-label="open drawer"
            variant="contained"
            color="primary"
            onClick={() => { changePassword(params.data) }}
        >
            <VpnKeyIcon style={{ fontSize: 20 }} />
        </IconButton>
    };


    return (
        <AppConainer screename={"User"}>
            <Container maxWidth="lg" className={classes.container}>
                <div style={{ marginBottom: 10, marginTop: 20 }}>
                    <Button variant="contained" color="primary"
                        style={{ justifyContent: 'center', alignItems: 'center', fontSize: 12 }}
                        onClick={handleClickOpen}
                        disabled={accessActionBtn('Add')}
                    >
                        {renderField('ADD USER')}
                    </Button>
                    <Button variant="contained" color="primary"
                        style={{
                            justifyContent: 'center', alignItems: 'center',
                            marginLeft: 10, marginRight: 10, fontSize: 12
                        }}
                        onClick={onActivated}
                        // disabled={accessActionBtn('Activate User')}
                    >
                        {renderField('ACTIVATED USER')}
                    </Button>
                    <Button variant="contained" color="primary"
                        style={{
                            justifyContent: 'center', alignItems: 'center',
                            marginLeft: 10, marginRight: 10, fontSize: 12
                        }}
                        onClick={onDisabled}
                        // disabled={accessActionBtn('Disabled User')}
                    >
                        {renderField('DISABLED USER')}
                    </Button>
                    <Button variant="contained" color="primary"
                        style={{
                            justifyContent: 'center', alignItems: 'center',
                            marginLeft: 10, marginRight: 10, fontSize: 12
                        }}
                        onClick={onDeleted}
                        // disabled={accessActionBtn('Deleted User')}
                    >
                        {renderField('DELETED USER')}
                    </Button>

                    <Button variant="contained" color="primary"
                        style={{
                            justifyContent: 'center', alignItems: 'center',
                            marginLeft: 10, marginRight: 10, fontSize: 12
                        }}
                        onClick={onShowAll}
                        // disabled={accessActionBtn('Show All')}
                    >
                        {renderField('SHOW ALL')}
                    </Button>
                </div>

                {/* AgGridReact  Table*/}
                <div id="myGrid" className={getTheme === 'dark' ? "ag-theme-alpine-dark" : "ag-theme-alpine"}
                    style={{ height: 600, width: 1200, overflow: 'hidden', justifyContent: 'center', marginTop: 15 }}>

                    <AgGridReact
                        onGridReady={onGridReady}
                        // style={{ width: '100%', height: '100%' }}
                        // gridOptions={gridOptions}
                        // columnDefs={getColumnDefs}
                        // deltaRowDataMode={true}
                        alwaysShowHorizontalScroll={true}
                        pagination={true}
                        paginationPageSize="15"
                        frameworkComponents={{
                            editRender: editRender,
                            statusRender: statusRender,
                            passwordRender: passwordRender,
                            deleteRender: deleteRender,
                            customLoading: customLoading,
                            customLoadingOverlay: customLoading,

                        }}
                        rowData={null}
                        pagination={true}
                        loadingOverlayComponent={'customLoadingOverlay'}
                        defaultColDef={{ resizable: true }}>
                        <AgGridColumn alignItems='center' width={160} headerName={renderField('usr_FName')} field='usr_FName' cellRenderer={fieldRender} sortable={true} filter="agTextColumnFilter" />
                        <AgGridColumn alignItems='center' width={160} headerName={renderField('usr_LName')} field="usr_LName" cellRenderer={fieldRender} sortable={true} filter="agTextColumnFilter" />
                        <AgGridColumn alignItems='center' width={180} headerName={renderField('userName')} field="userName" cellRenderer={fieldRender} sortable={true} filter="agTextColumnFilter" />
                        <AgGridColumn alignItems='center' width={200} headerName={renderField('email')} field="email" cellRenderer={fieldRender} sortable={true} filter="agTextColumnFilter" />
                        <AgGridColumn alignItems='center' width={160} headerName={renderField('mobile')} field="mobile" cellRenderer={fieldRender} sortable={true} filter="agTextColumnFilter" />
                        {!accessActionBtn('Edit') && <AgGridColumn alignItems='center' width={77} headerName={renderField('Edit')} cellRenderer='editRender' />}
                        {!accessActionBtn('Status') && <AgGridColumn alignItems='center' width={80} headerName={renderField('Status')} field="Status" cellRenderer='statusRender' />}
                        {!accessActionBtn('Delete') && <AgGridColumn alignItems='center' width={80} headerName={renderField('Delete')} cellRenderer='deleteRender' />}
                        {!accessActionBtn('Password') && <AgGridColumn alignItems='center' width={100} headerName={renderField('Password')} cellRenderer='passwordRender' />}
                    </AgGridReact>
                </div>

                {/* <!----------------------------password dailogue --------------------------> */}
                <DailogeBox
                    paswordOpen={paswordOpen}
                    handlePasswordOpen={handlePasswordOpen}
                    handlePasswordClose={handlePasswordClose}
                    passwrdData={passwrdData}
                    pass={'pass'}

                />

                <SignUp
                    handleClose={handleClose}
                    open={open}
                    onSubmitClick={(e) => { gridApi.showLoadingOverlay(); }}
                    editData={userEditData}
                    setRefresh={setRefresh}
                    onSuccess={async () => {
                        const result = await dispatch(getAlluserDatathunk());
                        gridApi.setRowData(result.payload);

                    }}
                    onSubmitClose={() => { gridApi.hideOverlay(); }} />

            </Container>
        </AppConainer >
    );
}