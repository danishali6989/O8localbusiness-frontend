import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { AppConainer } from '../../../components'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSelector } from 'react-redux';
import { useCustomNotify } from '../../../components'
import { useUserData } from '../../../hooks/useUserData'
import { fetchScreens, ScreenAdd, EditScreenUpdate, deleteScreenid, FiledGetAllLanguageThunk, getUserDataByIdThunk, getScreenAccessByUserRoleIdThunk } from 'generic';




import { useDispatch } from 'react-redux';
const useStyles = makeStyles((theme) => ({

    container: {
        width: '100%'
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
    root: {
        '& > *': {
            margin: theme.spacing(1),

        },
    }
}));

export const Screen = () => {
    let paramsData;
    const userData = useUserData();
    const getTheme = useSelector(state => state.customThemeReducer.newTheme);
    const [screens, setSreens] = useState([])
    const [screenData, setScreenData] = useState([]);
    const [updateScreenName, setUpdateScreenName] = useState('');
    const [updateScreenCode, setUpdateScreenCode] = useState('');
    const [updateScreenURL, setUpdateScreenURL] = useState('');
    const [updatebox, setUpdatebox] = React.useState(false);
    const [deletebox, setDeletebox] = React.useState(false);
    const [addScreenName, setAddScreenName] = useState('');
    const [addScreenCode, setAddScreenCode] = useState('');
    const [addScreenURL, setaddScreenURL] = useState('');
    const [open, setOpen] = React.useState(false);
    const [token, setToken] = useState('');
    const [gridParams, setGridParams] = useState(null);
    const CustomNotify = useCustomNotify();
    const langField = useSelector((state) => state.languageReducer.fieldlanguage);
    const [accessList, setAccessList] = useState([]);

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        getScreens()

    }, [])

    const getScreens = async () => {
        const result = await dispatch(fetchScreens());
        return result;

    };

    const buttonClicked = (data) => {
        setUpdateScreenName(data.screenName);
        setUpdateScreenCode(data.screenCode);
        setUpdateScreenURL(data.screenUrl);
        setScreenData(data);
        setUpdatebox(true)
    }

    const Updatehandleclose = () => {
        setUpdatebox(false)
    };


    const onchangeScreenName = (e) => {
        e.preventDefault();
        setUpdateScreenName(e.target.value)
    };

    const onchangeScreenCode = (e) => {
        e.preventDefault();
        setUpdateScreenCode(e.target.value)

    }
    const onchangeScreenURL = (e) => {
        e.preventDefault();
        setUpdateScreenURL(e.target.value)
    }

    const UpdateSubmit = async (e) => {
        e.preventDefault();
        Updatehandleclose();
        gridParams.showLoadingOverlay();
        const token = window.localStorage.getItem('token');

        const updateData = {
            id: screenData.id,
            token: token,
            screenName: updateScreenName,
            screenCode: updateScreenCode,
            screenUrl: updateScreenURL

        }
        const result = await dispatch(EditScreenUpdate(updateData));

        if (result.payload === 'Screen Updated') {
            const getScreenData = await getScreens();
            const filterData = getScreenData.payload.filter(i => i.status !== 3 && i.status !== 2)
            gridParams.setRowData(filterData);
            CustomNotify(renderField('Updated Successfully'), "success");
        } else {
            gridParams.hideOverlay();
            CustomNotify(renderField('something went wrong'), "error");
        }

    }

    const onGridReady = (params) => {
        paramsData = params.api;
        setGridParams(params.api)
        const getScreens = async () => {
            const result = await dispatch(fetchScreens());
            console.log('result>>>', result)
            if (result) {
                const filterData = result?.payload.filter(i => i.status !== 3 && i.status !== 2)
                params.api.setRowData(filterData);
            } else {
                params.api.setRowData([]);
            }

        }

        getScreens();
        params.api.sizeColumnsToFit();
    }


    const screenDelete = async (deleteData) => {
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
        const result = await dispatch(deleteScreenid(deletedata))
        if (result.payload === "deleted") {
            const getScreenData = await getScreens();
            const filterData = getScreenData.payload.filter(i => i.status !== 3 && i.status !== 2)
            paramsData.setRowData(filterData);
            CustomNotify(deletedTxt, "success");
        } else {
            paramsData.hideOverlay();
            CustomNotify(sthTxt, "error");
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        handleClose();
        gridParams.showLoadingOverlay();
        const token = window.localStorage.getItem('token')

        const screenData = {
            token: token,
            screenName: addScreenName,
            screenCode: addScreenCode,
            screenUrl: addScreenURL
        }

        const result = await dispatch(ScreenAdd(screenData));

        if (result.payload === "Screen Created") {
            await dispatch(fetchScreens())
            const getScreenData = await getScreens();
            const filterData = getScreenData.payload.filter(i => i.status !== 3 && i.status !== 2)
            gridParams.setRowData(filterData);
            CustomNotify(renderField('Screen Added Successfully'), "success");
        } else {
            gridParams.hideOverlay();
            CustomNotify(renderField('something went wrong'), "error");
        }

    }


    const screenName = (event) => {
        event.preventDefault();
        setAddScreenName(event.target.value)

    }

    const screenCode = (event) => {
        event.preventDefault();
        setAddScreenCode(event.target.value)

    }

    const screenURL = (event) => {
        event.preventDefault();
        setaddScreenURL(event.target.value)
    }

    const customLoading = () => {
        return <CircularProgress color="primary" />
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


    const changeData = () => {
        return (
            <>
                <label>{renderField('screenName')}</label>
            </>
        )
    };

    const editRender = (params) => {
        return <IconButton
            edge="start"
            aria-label="open drawer"
            variant="contained" color="primary"
            // disabled={accessActionBtn('Edit Screen')}
            onClick={() => buttonClicked(params.data)}>
            <Edit fontSize="small" />
        </IconButton>
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
        return result;
    };

    const fetchLanguageFields = async (langId) => {
        const fields = await fetchFields(langId);
        if (fields.payload) {
            return fields.payload;
        };
        return null;
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
            // disabled={accessActionBtn('Delete Screen')}
            onClick={() => deleteHandler(params.data)}>
            <DeleteOutline fontSize="small" />
        </IconButton>
    };

    useEffect(() => {
        permiRolelist();
    }, [])

    const permiRolelist = async () => {
        const token = window.localStorage.getItem('token')
        const id = userData.RoleId;
        const result = await dispatch(getScreenAccessByUserRoleIdThunk({ id, token }));
        let getScreenId = result.payload.screens.filter((i) => i.screenName === "Screen");
        let filterAccessList = result.payload.permissions.filter((i) => i.screenId === getScreenId[0].screenId);
        setAccessList(filterAccessList)
    };

    const accessActionBtn = (btn) => {
        let accessBtn = accessList.find((i) => i.permin_title === btn);
        return accessBtn ? false : true;
    }

    return (
        <AppConainer screename={"Screen"}>
            <Container maxwidth="lg" className={classes.container}>

                <div style={{ marginBottom: 10, marginTop: 10 }}>
                    <Button variant="contained" color="primary"
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        onClick={handleClickOpen}
                        disabled={accessActionBtn('Add')}
                    >
                        {renderField('ADD SCREEN')}

                    </Button>
                </div>

                <div className={getTheme === 'dark' ? "ag-theme-alpine-dark" : "ag-theme-alpine"} style={{ height: 400, width: 821, justifyContent: 'center', marginTop: 10 }}>
                    <AgGridReact
                        pagination={true}
                        defaultColDef={{ resizable: true }}
                        onGridReady={onGridReady}
                        frameworkComponents={{
                            changeData: changeData,
                            customLoadingOverlay: customLoading,
                            editRender: editRender,
                            deleteRender: deleteRender,
                        }}

                        loadingOverlayComponent={'customLoadingOverlay'}
                        // isFullWidthCell={true}


                        rowData={null}>
                        <AgGridColumn width={300} alignItems='center' headerName={renderField("screenName")} field="screenName" fontSize="small" sortable={true} filter="agTextColumnFilter" />
                        <AgGridColumn width={300} alignItems='center' headerName={renderField("screenCode")} field="screenCode" fontSize="small" sortable={true} filter="agTextColumnFilter" />
                        {!accessActionBtn('Edit') && <AgGridColumn width={100} alignItems='center' headerName={renderField("Edit")} field="Edit" cellRenderer="editRender" />}
                        {!accessActionBtn('Delete') && <AgGridColumn width={100} alignItems='center' headerName={renderField("Delete")} field="Delete" cellRenderer="deleteRender" />}
                    </AgGridReact>

                </div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{ padding: 50 }}>
                    <DialogTitle id="form-dialog-title">{renderField('ADD SCREEN')}</DialogTitle>


                    <DialogContent>
                        <form noValidate autoComplete="off" style={{ marginRight: 20 }}>
                            <TextField className={classes.formControl}
                                id="outlined-basic" label={renderField('Screen Name')}
                                variant="outlined"
                                onChange={screenName} />

                            <TextField className={classes.formControl}
                                id="outlined-basic" label={renderField('screen Code')}
                                variant="outlined"
                                onChange={screenCode} />

                            <TextField className={classes.formControl}
                                id="outlined-basic" label={renderField('Screen Url')}
                                variant="outlined"
                                onChange={screenURL} />


                            <div className={classes.root} style={{ display: "flex", marginLeft: 300 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    onClick={onSubmit}
                                >
                                    {renderField('ADD')}

                                </Button>

                                <Button
                                    style={{ background: "#f21505", color: "#f5fafa" }}
                                    variant="contained"
                                    // color="#f5fafa"
                                    onClick={handleClose}
                                >
                                    {renderField('CLOSE')}
                                </Button>

                            </div>

                        </form>

                    </DialogContent>


                </Dialog>

                <Dialog open={updatebox} onClose={Updatehandleclose} aria-labelledby="form-dialog-title" style={{ padding: 20 }}>
                    <DialogTitle id="form-dialog-title">{renderField('Update Screen')} </DialogTitle>


                    <DialogContent>
                        <form noValidate autoComplete="off" style={{ marginRight: 20 }}>
                            <TextField className={classes.formControl}
                                id="outlined-basic" label={renderField('Screen Name')}
                                variant="outlined"
                                value={updateScreenName}
                                onChange={onchangeScreenName}
                            />

                            <TextField className={classes.formControl}
                                label={renderField('screenCode')}
                                id="outlined-basic"
                                variant="outlined"
                                value={updateScreenCode}
                                onChange={onchangeScreenCode}
                            />
                            <TextField className={classes.formControl}
                                label={renderField('Screen Url')}
                                id="outlined-basic"
                                variant="outlined"
                                value={updateScreenURL}
                                onChange={onchangeScreenURL}
                            />


                            <div className={classes.root} style={{ display: "flex", marginLeft: 300 }}>

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"

                                    onClick={UpdateSubmit}
                                >
                                    {renderField('UPDATE')}
                                </Button>

                                <Button
                                    style={{ background: "#f21505", color: "#f5fafa" }}
                                    variant="contained"
                                    // color="#f5fafa"
                                    onClick={Updatehandleclose}
                                >
                                    {renderField('CLOSE')}
                                </Button>

                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </Container>

        </AppConainer >

    )
}