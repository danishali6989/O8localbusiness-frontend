import { Container } from '@material-ui/core'
import React, { useState, useEffect, useRef } from 'react'
import { Button, IconButton } from '@material-ui/core'
import { AppConainer } from '../../../components'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Checkbox } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import {
    PermissionAddThunk, fetchScreens, GetAllPermissionThunk,
    PermissionEditThunk, DeletePermissionThunk, getUserDataByIdThunk, FiledGetAllLanguageThunk
} from 'generic'
import { useCustomNotify } from '../../../components'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import Edit from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { useUserData } from '../../../hooks/useUserData'
import { confirmAlert } from 'react-confirm-alert';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        //   width:1000,
        // marginLeft: -80

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '70vh', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        minWidth: 275,
        flexGrow: 1,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: '100%',

    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    img: {
        width: "8rem",
        height: "8rem",
        marginTop: "-5rem",
        marginLeft: "rem",
    },
}));


export const Permission = () => {
    const dispatch = useDispatch();
    const userData = useUserData();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [age, setAge] = React.useState('');
    const [selectScreen, setSelectScreen] = useState(null);
    const [permission, setPermission] = React.useState('');
    const [permiDescription, setPermiDescription] = React.useState('');
    const screenlist = useSelector((state) => state.screenReducer.screens)
    const langField = useSelector((state) => state.languageReducer.fieldlanguage);
    const CustomNotify = useCustomNotify();
    let paramsData;
    let gridRef = useRef(null);
    const [gridParams, setGridParams] = useState(null);
    const [permissionEditData, setPermissionEditData] = useState(null);
    const getTheme = useSelector(state => state.customThemeReducer.newTheme);

    const onPermission = (e) => {
        e.preventDefault()
        setPermission(e.target.value)
    }

    const onpermiDescription = (e) => {
        e.preventDefault()
        setPermiDescription(e.target.value)
    }

    const onChangeHandler = (event) => {
        event.preventDefault()
        setSelectScreen(event.target.value);

    };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setSelectScreen(null);
        setPermission(null);
        setPermiDescription(null);
        setPermissionEditData(null)
        setOpen(false);
    };

    useEffect(() => {
        // getAllData();
    }, [])


    const permissionAdd = async () => {
        const token = window.localStorage.getItem('token')
        const data = {
            permissions: permission,
            permission_Description: permiDescription,
            screenId: selectScreen,
        }
        const result = await dispatch(PermissionAddThunk({ data, token }))
        if (result.payload === 'Permission Added') {
            CustomNotify(renderField('Permission Added Successfully'), "success")
            const getAllData = async () => {
                const result = await dispatch(GetAllPermissionThunk())
                gridParams.setRowData(result.payload);
            };
            getAllData();
            handleClose();
        } else {
            CustomNotify(renderField('something went wrong'), "error")
        }
    }

    const updatePermissionHandler = () => {
        console.log(gridRef.current, gridParams)
        handleClose();
        gridRef.current.api.showLoadingOverlay();
    }

    const permissionUpdate = async (e) => {
        e.preventDefault();
        gridParams.showLoadingOverlay();
        const token = window.localStorage.getItem('token');

        const updateData = {
            id: permissionEditData.id,
            permissions: permission,
            permission_Description: permiDescription,
            screenId: selectScreen
        }

        const result = await dispatch(PermissionEditThunk(updateData, token));

        if (result.payload === 'Permission Updated') {
            CustomNotify(renderField('Updated Successfully'), "success");
            const getAllData = async () => {
                const result = await dispatch(GetAllPermissionThunk())
                gridParams.setRowData(result.payload);
            };
            getAllData();
            handleClose();
        } else {
            CustomNotify(renderField('something went wrong'), "error");
        }
        gridParams.hideOverlay();

    }



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

    const languageField = (langField, value) => {
        let screenName = value;
        if (langField) {
            let filterField = langField.filter(i => i.field === value);
            if (filterField.length > 0) {
                screenName = filterField[0].description;
            };
        };
        return screenName;
    }



    const screenDelete = async (deleteData) => {
        console.log("deleteData>>", deleteData)
        const user = await fetchUserData();

        let deletedTxt = 'Deleted Successfully';
        let sthTxt = 'something went wrong';
        if (user) {
            const langId = user.payload?.langId;
            let fetchLangField = await fetchLanguageFields(langId);
            deletedTxt = languageField(fetchLangField, deletedTxt);
            sthTxt = languageField(fetchLangField, sthTxt);
        }
        paramsData.showLoadingOverlay();
        const token = window.localStorage.getItem('token');
        const deletedata = {
            id: deleteData.id,
            token: token
        }

        const result = await dispatch(DeletePermissionThunk(deletedata))
        if (result.payload === "Deleted") {
            const getAllData = async () => {
                const resultq = await dispatch(GetAllPermissionThunk())
                paramsData.setRowData(resultq.payload);
            };
            getAllData();
            CustomNotify(deletedTxt, "success");
        } else {
            paramsData.hideOverlay();
            CustomNotify(sthTxt, "error");
        }
    }




    const onGridReady = (params) => {
        setGridParams(params.api);
        params.api.sizeColumnsToFit();
        paramsData = params.api;
        gridRef.current = params.api;
        params.api.showLoadingOverlay();

        const getAllData = async () => {
            const result = await dispatch(GetAllPermissionThunk())
            params.api.setRowData(result.payload);
        };
        getAllData();

    }

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

    const editHandler = (data) => {
        setSelectScreen(data.screenId);
        setPermission(data.permissions);
        setPermiDescription(data.permission_Description);
        setPermissionEditData(data)
        setOpen(true)
    };
    const fetchLanguageFields = async (langId) => {
        const fields = await fetchFields(langId);
        if (fields.payload) {
            return fields.payload;
        };
        return null;
    };

    const fetchFields = async (id) => {
        const token = window.localStorage.getItem('token')
        const lang_id = id;
        const result = await dispatch(FiledGetAllLanguageThunk(lang_id, token));
        return result;
    };
    const fetchUserData = async () => {
        if (userData !== null) {
            const result = await dispatch(getUserDataByIdThunk({ id: userData.id }))
            return result;
        }
        return null;
    };

    const deleteHandler = async (data) => {
        const user = await fetchUserData();
        let confirmTxt = 'Confirm to Delete';
        let areYouSureTxt = 'Are you sure to do this.';
        let yesTxt = 'Yes';
        let noTxt = 'No';
        let deletedTxt = 'Deleted Successfully';
        let sthTxt = 'something went wrong';

        if (user) {
            const langId = user.payload?.langId;
            let fetchLangField = await fetchLanguageFields(langId);
            confirmTxt = languageField(fetchLangField, confirmTxt);
            areYouSureTxt = languageField(fetchLangField, areYouSureTxt);
            yesTxt = languageField(fetchLangField, yesTxt);
            noTxt = languageField(fetchLangField, noTxt);
            deletedTxt = languageField(fetchLangField, deletedTxt);
            sthTxt = languageField(fetchLangField, sthTxt);
        }


        confirmAlert({
            title: confirmTxt,
            message: areYouSureTxt,
            buttons: [
                {
                    label: yesTxt,
                    onClick: () => screenDelete(data)
                },
                {
                    label: noTxt,

                }
            ]
        });



    };



    const deleteRender = (params) => {
        return <IconButton
            edge="start"
            aria-label="open drawer"
            variant="contained" color="secondary"
            onClick={() => deleteHandler(params.data)}>
            <DeleteOutline fontSize="small" />
        </IconButton>
    };

    const customLoading = () => {
        return <CircularProgress color="primary" />
    };


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


    return (
        <AppConainer>
            <Container>
                <Button variant="contained" color="primary" style={{ marginTop: 30, }} onClick={handleClickOpen} >
                    {renderField(' Add Permission')}
                </Button>

                <div className={getTheme === 'dark' ? "ag-theme-alpine-dark" : "ag-theme-alpine"}

                    style={{ height: 400, width: '100vh', marginTop: 50, marginLeft: 60 }}
                >

                    <AgGridReact
                        onGridReady={onGridReady}
                        alwaysShowHorizontalScroll={true}
                        frameworkComponents={{
                            editRender: editRender,
                            deleteRender: deleteRender,
                        }}

                        loadingOverlayComponent={'customLoadingOverlay'}
                    >
                        <AgGridColumn alignItems='center' headerName={renderField('Permission')} field='permissions' cellRenderer={fieldRender} sortable={true} filter="agTextColumnFilter" />
                        <AgGridColumn alignItems='center' headerName={renderField('Screen')} field='screenId' cellRenderer={fieldRender} sortable={true} filter="agTextColumnFilter" />
                        <AgGridColumn alignItems='center' headerName={renderField('Description')} field='permission_Description' cellRenderer={fieldRender} sortable={true} filter="agTextColumnFilter" />
                        <AgGridColumn alignItems='center' width={100} headerName={renderField('Edit')} cellRenderer='editRender' />
                        <AgGridColumn alignItems='center' width={100} headerName={renderField('Delete')} cellRenderer='deleteRender' />
                    </AgGridReact>
                </div>



                <div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        maxWidth="md"

                    >
                        <DialogContent>
                            <CssBaseline />
                            <div className={classes.paper}>
                                <Typography component="h1" variant="h5">
                                    {renderField('Permission')}
                                </Typography>
                                <form className={classes.form} noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} >
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-outlined-label">{renderField('Select Screen')}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    onChange={onChangeHandler}
                                                    label={renderField('Select Screen')}
                                                    value={selectScreen}
                                                >
                                                    {
                                                        screenlist.map((item) => {
                                                            return (
                                                                <MenuItem value={item.id}>{item.screenName}</MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-outlined-label">{renderField('Permission Title')}</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    name="roleId"
                                                    onChange={onPermission}
                                                    value={permission}
                                                    // onChange={itemRoleid}
                                                    onChange={(e) => setPermission(e.target.value)}
                                                    label="Permission Title"
                                                    style={{ width: '100%', marginBottom: 20 }}
                                                >
                                                    <MenuItem value="">
                                                        <em>{renderField('Select')}</em>
                                                    </MenuItem>

                                                    <MenuItem value={"View"}>View</MenuItem>
                                                    <MenuItem value={"Edit"}>Edit</MenuItem>
                                                    <MenuItem value={"Delete"}>Delete</MenuItem>
                                                    <MenuItem value={"Add"}>Add</MenuItem>
                                                    {/* <MenuItem value={"Status"}>Status</MenuItem>
                                                    <MenuItem value={"Password"}>Password</MenuItem> */}
                                                    {/* <MenuItem value={"Add Screen"}>Add Screen</MenuItem> */}

                                                </Select>
                                            </FormControl>
                                            {/* <TextField
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="permission Title"
                                                label={renderField('Permission Title')}
                                                name="Permission Title"
                                                autoComplete="Permission Title"
                                                onChange={onPermission}
                                                value={permission}
                                            /> */}
                                        </Grid>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label={renderField('Permission Description')}
                                            multiline
                                            rows={4}
                                            onChange={onpermiDescription}
                                            variant="outlined"
                                            style={{ width: 600, marginLeft: 8, marginRight: 8, marginTop: 10 }}
                                            value={permiDescription}

                                        />
                                    </Grid>
                                </form>
                            </div>

                            <DialogActions  >
                                {permissionEditData ?
                                    <Button
                                        style={{ marginLeft: 20 }}
                                        variant="contained"
                                        color="primary"
                                        // onClick={updatePermissionHandler}
                                        onClick={permissionUpdate}
                                    >
                                        Update
                                    </Button>
                                    :
                                    <Button
                                        style={{ marginLeft: 20 }}
                                        variant="contained"
                                        color="primary"
                                        onClick={permissionAdd}
                                    >
                                        Save
                                    </Button>
                                }
                                <Button
                                    style={{ background: "#f21505", color: "#f5fafa" }}
                                    variant="contained"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                            </DialogActions>
                        </DialogContent>


                    </Dialog>
                </div>
            </Container>
        </AppConainer >
    )
}
