import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ActionComponent, AppConainer } from '../../../components'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import CircularProgress from '@material-ui/core/CircularProgress';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button } from '@material-ui/core';
import { SignUp } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getAlluserDatathunk } from 'generic/src/redux/reducers/userReducer';
import { useUserData } from '../../../hooks/useUserData'
import { toggelStatusThunk } from 'generic';
import { DailogeBox } from '../../../components/DailogBox';
import { useCustomNotify } from '../../../components';
import { useHistory } from 'react-router-dom';

//create your forceUpdate hook
function useForceUpdate() {
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

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
    let paramsData;
    const history = useHistory()
    const getTheme = useSelector(state => state.customThemeReducer.newTheme);
    const langField = useSelector((state) => state.languageReducer.fieldlanguage);
    const [userEditData, setUserEditData] = useState(null);
    const [passwrdData, setPasswrdData] = useState(null)
    const [refresh, setRefresh] = useState('')
    const user = useSelector((state) => state.userReducer.data)
    const created = useSelector((state) => state.userReducer)
    const forceData = useSelector((state) => state)
    console.log("forceData>>", forceData)
    const classes = useStyles();
    const dispatch = useDispatch()
    // const history = useHistory()
    const authData = useUserData()
    const [open, setOpen] = useState(false);
    const [paswordOpen, setPaswordOpen] = useState(false)
    const [gridApi, setGridApi] = useState(null);
    const CustomNotify = useCustomNotify();
    const [forceRender, setForceRender] = useState(false);

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
        params.api.showLoadingOverlay();

        const getAllData = async () => {
            // dispatch(getRoleThunk())
            const result = await dispatch(getAlluserDatathunk())
            params.api.setRowData(result.payload);
        };
        getAllData();
        params.api.sizeColumnsToFit();
    }

    useEffect(async () => {
        const token = window.localStorage.getItem('token')

        const CompanyId = authData.CompanyId;

        // dispatch(getRoleThunk())
        const result = await dispatch(getAlluserDatathunk())
        // newForcerData();

    }, [forceRender])

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



    const actionHeader = () => {
        return (
            <div style={{
                display: 'flex',
                flex: 1,
                width: 160,
                justifyContent: 'space-between',
                alignItems: 'center',
                marginRight: 20,
            }}>
                {/* <label>{renderField('Edit')}</label>
                <label>{renderField('Status')}</label>
                <label>{renderField('Delete')}</label>
                <label>{renderField('Psw')}</label> */}
                <label>Edit</label>
                <label>Status</label>
                <label>Delete</label>
                <label>Psw</label>
            </div>
        )
    }



    // const newForcerData = async () => {
    //     const result = await dispatch(setForceReducer())
    //     console.log("result>>>", result.payload)
    // }

    const renderFirstNameField = () => {
        let screenName = 'usr_FName';
        if (langField) {
            let filterField = langField.filter(i => i.field === 'usr_FName');
            console.log({ filterField })
            if (filterField.length > 0) {
                screenName = filterField[0].description;
            };

        };
        let name = renderField('usr_FName');
        console.log({ screenName, name })
        return (<>
            <label>{name}</label>
        </>)
    };

    const renderdata = (event, i) => {
        const header = event
        console.log({ header, i })
        return (
            <>
                <label>{renderField('usr_FName')}</label>
            </>
        )
    }
    var tempdata = []
    var tempLocation = [];
    var tempLocationObj = [];
    var tempColor = []
    var colors = [
        { value: "#1dab43", name: 'Green' },
        { value: "#cc1427", name: 'Red' },
        { value: "#7f0c94", name: 'Purple' },
        { value: "#2210c7", name: 'Blue' },
        { value: "#eb0eca", name: 'Pink' },
        { value: "#b7c223", name: 'Yellow' },
    ]
    colors.map((u, i) => {
        tempColor.push(u.name)
    })

    function ActionCellRenderer(params) {
        let eGui = document.createElement("div");
        let editingCells = params.api.getEditingCells();
        // checks if the rowIndex matches in at least one of the editing cells
        let isCurrentRowEditing = editingCells.some((cell) => {
            return cell.rowIndex === params.node.rowIndex;
        });

        const changeStatus = async (userData, process) => {
            // setMsgOpen(true)
            paramsData.showLoadingOverlay();
            const token = window.localStorage.getItem('token')
            const id = userData.id;
            let status = 1;
            if (userData.status === 2 || userData.status === 3) {
                status = 1;
            } else {
                status = 2;
            }
            const data = {
                status: status
            }
            const result = await dispatch(toggelStatusThunk({ data, id, token }))


            if (result.payload === "Status Updated") {
                const result = await dispatch(getAlluserDatathunk());
                paramsData.setRowData(result.payload);

                if (userData.status === 2 || userData.status === 3) {
                    status = 1;
                    CustomNotify("Status Activated  Successfully", "success");

                } else if ((userData.status === 1 || userData.status === 3)) {
                    status = 2;
                    CustomNotify(" Deactivated  Successfully", "error");
                }

            } else {
                CustomNotify("Something went Wrong", "error");
                paramsData.hideOverlay();

            }


            //    gridApi.redrawRows();

        }



        const EditSubmitHandler = (data) => {
            setUserEditData(data)
            setOpen(true)
        };


        const deleteHandler = async (params) => {
            paramsData.showLoadingOverlay();
            // alert("<h1>Do you want to delete this user !!!</h1>")
            const id = params.id
            const token = window.localStorage.getItem('token')
            let status = 1
            if (params.status === 3) {
                status = 1;
            } else {
                status = 3;

            }
            const data = {
                status: status
            }
            const result = await dispatch(toggelStatusThunk({ data, id, token }))
            if (result.payload == "Status Updated") {
                const result = await dispatch(getAlluserDatathunk());
                paramsData.setRowData(result.payload);
                if (params.status === 3) {
                    status = 1;
                    CustomNotify("Activated  Successfully", "success");
                } else if (params.status === 1) {
                    status = 3;
                    CustomNotify("Deleted Sucessfully", "success");
                }

            } else {
                paramsData.hideOverlay();

            }


        }


        const changePassword = (data) => {
            setPaswordOpen(true)
            setPasswrdData(data)

        }
        return (
            <ActionComponent


                handleEdit={() => {
                    EditSubmitHandler(params.data)
                }}
                isChecked={params.data.status === 1 ? false : true}
                isDeleted={params.data.status === 3 ? false : true}

                handleDelete={() => { deleteHandler(params.data) }}
                handleStatus={() => changeStatus(params.data)}
                handlePassword={() => changePassword(params.data)}
            />
        )



    }

    const onRowValueChanged = (params) => {


    };

    const renderFieldName = (event) => {
        const fieldName = event.colDef.field;
        console.log({ fieldName })
        return `<div>
        </div>`
    };

    const fieldRender = (event) => {
        let color = ""
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


    const cellStyle = (params) => {
        if (params.data.status == "off") {
            //Here you can check the value and based on that you can change the color
            //mark police cells as red
            return {
                color: '#dddddd',
                'padding-left': '0px',
                'padding-right': '0px'
            };
        } else if (params.data.isDeleted === true) {
            return {
                'padding-left': '0px',
                'padding-right': '0px'
            }
        } else {
            return {
                'padding-left': '0px',
                'padding-right': '0px'
            }
        }
    }
    var tempdata = []
    user && user.map((item, index) => {
        tempdata.push({
            app_id: item.app_id,
            callStatus: false,
            companyId: item.companyId,
            companyName: null,
            email: item.email,
            finance_year: item.finance_year,
            id: item.id,
            image: null,
            imageUrl: null,
            ip_Address: item.ip_Address,
            mobile: item.mobile,
            otp: 0,
            password: item.password,
            roleId: item.roleId,
            roleName: item.roleName,
            status: item.status,

            userName: item.userName,
            full_Name: item.usr_FName + "  " + item.usr_LName,
            usr_FName: item.usr_FName,
            usr_LName: item.usr_LName,
        });
        return 0;
    })


    const onActivated = () => {
        gridApi.showLoadingOverlay();
        let filteredActivated = user.filter(i => i.status === 1);
        if (filteredActivated.length > 0) {
            setTimeout(() => {
                gridApi.setRowData(filteredActivated);

            }, [500]);
        } else {
            CustomNotify("No Activated User found", "error");
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
            CustomNotify("No Disabled User found", "error");
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
            CustomNotify("No Deleted User found", "error");
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

    function getColumnDefs() {
        return [
            { field: 'athlete' },
            { field: 'age' },
            { field: 'country' },
            { field: 'sport' },
            { field: 'year' },
            { field: 'date' },
            { field: 'gold' },
            { field: 'silver' },
            { field: 'bronze' },
            { field: 'total' },
        ];
    }


    return (
        <AppConainer screename={"User"} >
            <Container maxWidth="lg" className={classes.container}>
                {/* <h1>UserManagement</h1> */}
                <div style={{ marginBottom: 10, marginTop: 20 }}>
                    <Button variant="contained" color="primary"
                        style={{ justifyContent: 'center', alignItems: 'center', fontSize: 12 }}
                        onClick={handleClickOpen}
                    >
                        {renderField('ADD USER')}
                    </Button>
                    <Button variant="contained" color="primary"
                        style={{
                            justifyContent: 'center', alignItems: 'center',
                            marginLeft: 10, marginRight: 10, fontSize: 12
                        }}
                        onClick={onActivated}
                    >
                        {renderField('ACTIVATED USER')}
                    </Button>
                    <Button variant="contained" color="primary"
                        style={{
                            justifyContent: 'center', alignItems: 'center',
                            marginLeft: 10, marginRight: 10, fontSize: 12
                        }}
                        onClick={onDisabled}
                    >
                        {renderField('DISABLED USER')}
                    </Button>
                    <Button variant="contained" color="primary"
                        style={{
                            justifyContent: 'center', alignItems: 'center',
                            marginLeft: 10, marginRight: 10, fontSize: 12
                        }}
                        onClick={onDeleted}
                    >
                        {renderField('DELETED USER')}
                    </Button>

                    <Button variant="contained" color="primary"
                        style={{
                            justifyContent: 'center', alignItems: 'center',
                            marginLeft: 10, marginRight: 10, fontSize: 12
                        }}
                        onClick={onShowAll}
                    >
                        {renderField('SHOW ALL')}
                    </Button>


                </div>
                {/* AgGridReact  Table*/}
                <div id="myGrid" className={getTheme === 'dark' ? "ag-theme-alpine-dark" : "ag-theme-alpine"} style={{ height: 600, width: 1200, overflow: 'hidden', justifyContent: 'center', marginTop: 15 }}>

                    <AgGridReact

                        onGridReady={onGridReady}
                        style={{ width: '100%', height: '100%' }}
                        // gridOptions={gridOptions}
                        alwaysShowHorizontalScroll={true}
                        pagination={true}
                        // columnDefs={getColumnDefs}
                        paginationPageSize="15"
                        // deltaRowDataMode={true}
                        frameworkComponents={{
                            actionCellRenderer: ActionCellRenderer,
                            actionHeader: actionHeader,
                            renderdata: renderdata,
                            renderFirstNameField: renderFirstNameField,
                            customLoading: customLoading,
                            customLoadingOverlay: customLoading,
                        }}
                        rowData={null}
                        pagination={true}
                        loadingOverlayComponent={'customLoadingOverlay'}
                        defaultColDef={{ resizable: true }} >


                        {/* <AgGridColumn  field="Images" cellRenderer="ImageShow" sortable={true} filter="agTextColumnFilter"></AgGridColumn> */}
                        <AgGridColumn field="usr_FName" cellRenderer={fieldRender} sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="usr_LName" cellRenderer={fieldRender} label="Last Name" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="userName" cellRenderer={fieldRender} label="UserName" sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="email" cellRenderer={fieldRender} sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="mobile" cellRenderer={fieldRender} style={{ width: 1050 }} sortable={true} filter="agTextColumnFilter"></AgGridColumn>
                        <AgGridColumn field="Action" style={{ width: 300 }} cellRenderer='actionCellRenderer' headerComponent="actionHeader" id={'id'}>
                        </AgGridColumn>

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
        </AppConainer>
    );
}