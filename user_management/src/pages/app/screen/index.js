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
import {  useHistory } from 'react-router-dom';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useSelector } from 'react-redux';
import { useCustomNotify } from '../../../components'
import { fetchScreens, ScreenAdd, EditScreenUpdate, deleteScreenid } from 'generic';




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
            // marginLeft :'7rem'
            // margin-left: 20rem
            // display: "flex",
            // marginLeft:200
            // flexDirection: "row",
            // justifyContent: "left"
        },
    }
}));

export const Screen = () => {
    let paramsData;

    const getTheme = useSelector(state => state.customThemeReducer.newTheme);
    const [screens, setSreens] = useState([])
    const [screenData, setScreenData] = useState([]);
    const [updateScreenName, setUpdateScreenName] = useState('');
    const [updateScreenCode, setUpdateScreenCode] = useState('');
    const [updateScreenURL, setUpdateScreenURL] = useState('');
    const [updatebox, setUpdatebox] = React.useState(false);
    const [addScreenName, setAddScreenName] = useState('');
    const [addScreenCode, setAddScreenCode] = useState('');
    const [addScreenURL, setaddScreenURL] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [token, setToken] = useState('');
    const [gridParams, setGridParams] = useState(null);
    const CustomNotify = useCustomNotify();
    const langField = useSelector((state) => state.languageReducer.fieldlanguage);

    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        getScreens()

    }, [])

    const getScreens = async () => {
        const result = await dispatch(fetchScreens());
        console.log(result)
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
            CustomNotify("Updated Successfully", "success");
        } else {
            gridParams.hideOverlay();
            CustomNotify("something went wrong!", "error");
        }

    }

    const onGridReady = (params) => {

        paramsData = params.api;
        setGridParams(params.api)
        const getScreens = async () => {
            const result = await dispatch(fetchScreens());
            if (result) {
                const filterData = result.payload.filter(i => i.status !== 3 && i.status !== 2)
                params.api.setRowData(filterData);
            }
        }

        getScreens();
        params.api.sizeColumnsToFit();
    }

    const confirmDeleted = (data) => {
        confirmAlert({
            title: 'Confirm to Delete',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => screenDelete(data)
                },
                {
                    label: 'No',
                    // onClick: () => alert('Click No')
                }
            ]
        });
    }
    const screenDelete = async (data) => {

        paramsData.showLoadingOverlay();
        const token = window.localStorage.getItem('token');
        const deletedata = {
            id: data.id,
            token: token
        }


        const result = await dispatch(deleteScreenid(deletedata))
        if (result.payload === "deleted") {
            const getScreenData = await getScreens();
            const filterData = getScreenData.payload.filter(i => i.status !== 3 && i.status !== 2)
            console.log('paramData', paramsData)
            paramsData.setRowData(filterData);
            CustomNotify("Deleted Successfully", "success");
        } else {
            paramsData.hideOverlay();
            CustomNotify("Something went wrong!", "error");
        }
    }




    const totalValueRender = (e) => {

        return (
            <>
                <span >
                    <IconButton
                        edge="start"
                        aria-label="open drawer"
                        variant="contained" color="primary"
                        onClick={() => buttonClicked(e.data)}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                </span>
                <span >
                    <IconButton
                        edge="start"
                        aria-label="open drawer"
                        variant="contained" color="secondary"
                        onClick={() => confirmDeleted(e.data)}
                    >
                        <DeleteOutline fontSize="small" />
                    </IconButton>
                </span>



            </>

        )
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
            console.log('getScreenDAta', getScreenData)
            const filterData = getScreenData.payload.filter(i => i.status !== 3 && i.status !== 2)

            gridParams.setRowData(filterData);
            CustomNotify("Screen Added Successfully", "success");
        } else {
            gridParams.hideOverlay();
            CustomNotify("Something went wrong!!", "error");
        }

    }


    //     if (result.payload) {
    //         alert("Add Sucessfully Data")
    //         handleClose();
    //     } else {
    //         handleClose();
    //     }
    // }




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
    }

    return (
        <AppConainer screename={"Screen"}>
            <Container maxwidth="lg" className={classes.container}>

                <div style={{ marginBottom: 10, marginTop: 10 }}>
                    <Button variant="contained" color="primary"
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        onClick={handleClickOpen}
                    >
                        {renderField('ADD SCREEN')}

                    </Button>
                </div>

                <div className={getTheme === 'dark' ? "ag-theme-alpine-dark" : "ag-theme-alpine"} style={{ height: 400, width: 1080, justifyContent: 'center', marginTop: 10 }}>
                    <AgGridReact
                        pagination={true}
                        defaultColDef={{ resizable: true }}
                        onGridReady={onGridReady}
                        frameworkComponents={{
                            totalValueRender: totalValueRender,
                            changeData: changeData,
                            customLoadingOverlay: customLoading,
                        }}

                        loadingOverlayComponent={'customLoadingOverlay'}
                        // isFullWidthCell={true}


                        rowData={null}>
                        {/* <AgGridColumn field={renderField('id')} sortable={true} fontSize="small" filter="agTextColumnFilter"></AgGridColumn> */}
                        <AgGridColumn field="screenName"  fontSize="small" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="screenCode" fontSize="small" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        {/* <AgGridColumn field="screenUrl" fontSize="small" sortable={true} filter="agTextColumnFilter"></AgGridColumn> */}
                        <AgGridColumn field="Action" cellRenderer="totalValueRender"></AgGridColumn>
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
                {/* <Updatemodelbox classes={classes} updatebox={updatebox} /> */}
                {/* Update Screen */}
                <Dialog open={updatebox} onClose={Updatehandleclose} aria-labelledby="form-dialog-title" style={{ padding: 20 }}>
                    <DialogTitle id="form-dialog-title"> Update Screen </DialogTitle>


                    <DialogContent>
                        <form noValidate autoComplete="off" style={{ marginRight: 20 }}>
                            <TextField className={classes.formControl}
                                id="outlined-basic" label="Screen Name"
                                variant="outlined"
                                value={updateScreenName}
                                onChange={onchangeScreenName}
                            />

                            <TextField className={classes.formControl}
                                id="outlined-basic" label="Screen Code"
                                variant="outlined"
                                value={updateScreenCode}
                                onChange={onchangeScreenCode}
                            />
                            <TextField className={classes.formControl}
                                id="outlined-basic" label="Screen URL"
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
                                    Update
                                </Button>

                                <Button
                                    style={{ background: "#f21505", color: "#f5fafa" }}
                                    variant="contained"
                                    // color="#f5fafa"
                                    onClick={Updatehandleclose}
                                >
                                    Close
                                </Button>

                            </div>
                        </form>
                    </DialogContent>
                </Dialog>

            </Container>




        </AppConainer >

    )
}




