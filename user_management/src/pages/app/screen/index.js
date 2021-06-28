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
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { fetchScreens,Newscreen } from 'generic';

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
    const classes = useStyles();
    const dispatch = useDispatch();
    const [screens, setSreens] = useState([])
    // const rowData = [
    //     { screens:"", ScreenName: "Screen1" },
    //     { ScreenId: "2", ScreenName: "Screen2" },
    //     { ScreenId: "3", ScreenName: "Screen3" },
    // ]


    useEffect(() => {
        getScreens()
       
    }, [])

    const getScreens = async () => {
        const result = await dispatch(fetchScreens());
        console.log("result", result.payload)
        if (result) {
            setSreens(result.payload);
        }
    }

   

    const onGridReady = (params) => {
        params.api.sizeColumnsToFit();
    }
    const totalValueRender = () => {

        const buttonClicked = () => {
            alert(123)
        }


        return (
            <>
                <span >
                    <IconButton
                        edge="start"
                        aria-label="open drawer"
                        variant="contained" color="primary"
                        onClick={() => buttonClicked()}
                    >
                        <Edit fontSize="small" />
                    </IconButton>
                </span>
                <span >
                    <IconButton
                        edge="start"
                        aria-label="open drawer"
                        variant="contained" color="secondary"
                        onClick={() => buttonClicked()}
                    >
                        <DeleteOutline fontSize="small" />
                    </IconButton>

                </span>

            </>
        )
    }


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const [addScreen, setAddScreen] = useState(0);

    const onChange = (event) => {
        event.preventDefault();
        setAddScreen(event.target.value)
        console.log(addScreen)
    }




    return (
        <AppConainer >
            <Container maxwidth="lg" className={classes.container}>
                <div style={{ marginBottom: 10, marginTop: 10 }}>
                    <Button variant="contained" color="primary"
                        style={{ justifyContent: 'center', alignItems: 'center' }}
                        onClick={handleClickOpen}
                    >
                        Add Screen
                    </Button>
                </div>
                <div className="ag-theme-alpine" style={{ height: 400, width: 1060, justifyContent: 'center', marginTop: 10 }}>
                    <AgGridReact
                        pagination={true}
                        defaultColDef={{ resizable: true }}
                        onGridReady={onGridReady}
                        frameworkComponents={{
                            totalValueRender: totalValueRender
                        }}
                        rowData={screens}>
                        <AgGridColumn field="id" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="screenName" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="screenCode" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="Action" cellRenderer="totalValueRender"></AgGridColumn>
                    </AgGridReact>
                </div>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" style={{ padding: 20 }}>
                    <DialogTitle id="form-dialog-title">Add Screen</DialogTitle>
                    {/* {console.log("ddd", images)} */}

                    {/* {images && <img src={images} style={{ width: 70, height: 70, position: 'relative', left: 250 }} alt="" />} */}
                    <DialogContent>
                        <form noValidate autoComplete="off" style={{ marginRight: 20 }}>
                            <TextField className={classes.formControl}
                                id="outlined-basic" label="Screen Name"
                                variant="outlined"
                                onChange={onChange} />

                            <TextField className={classes.formControl}
                                id="outlined-basic" label="Screen Code"
                                variant="outlined" />


                            <div className={classes.root}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                >
                                    Add
                                </Button>

                                <Button

                                    variant="contained"
                                    color="secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>

                            </div>





                        </form>

                    </DialogContent>


                </Dialog>


            </Container>
        </AppConainer>

    )
}




